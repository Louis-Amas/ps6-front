import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../../services/student/student.service';
import {User} from '../../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-student-form-dialog',
  templateUrl: './student-form-dialog.component.html',
  styleUrls: ['./student-form-dialog.component.css']
})
export class StudentFormDialogComponent implements OnInit {

  YEAR: number[] = [];
  noteForm: FormGroup;
  private attachment: any;

  constructor(public dialogRef: MatDialogRef<StudentFormDialogComponent>, private route: ActivatedRoute,
              private studentService: StudentService, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public student: User) {
    this.noteForm = this.formBuilder.group({
      year: [2019, [Validators.required]],
      schoolLevel: ['', [Validators.required]],
      school: ['', [Validators.required]],
      note: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const year = new Date().getFullYear();
    for (let i = (year - 15); i < (year + 1); i++) {
      this.YEAR.push(i);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateStudent() {
    if (this.attachment !== undefined) {
       this.attachment.name = this.studentService.createFileNameWithNote(this.noteForm.value, this.attachment.name);
       this.studentService.uploadFile(this.attachment, this.student._id).subscribe(() => {
         this.studentService.insertNote(this.noteForm.value, this.student._id).subscribe( stu => {
           this.dialogRef.close(stu);
         });
       });
    }
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const filename = file.name;
      this.studentService.getBase64(file, (result) => {
        this.attachment = {
          name: filename,
          data: result
        };
      });
    }
  }

}
