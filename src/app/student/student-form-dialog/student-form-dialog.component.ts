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

  constructor(public dialogRef: MatDialogRef<StudentFormDialogComponent>, private route: ActivatedRoute,
              private studentService: StudentService, private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public student: User) {
    this.noteForm = this.formBuilder.group({
      year: [2019, [Validators.required]],
      schoolLevel: ['', [Validators.required]],
      school: ['', [Validators.required]],
      note: [10, [Validators.required]],
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
    const year = this.noteForm.get('year').value;
    const schoolLevel = this.noteForm.get('schoolLevel').value;
    const school = this.noteForm.get('school').value;
    const mark = this.noteForm.get('note').value;
  }

}
