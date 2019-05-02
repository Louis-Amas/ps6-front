import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../services/student/student.service';
import {ActivatedRoute} from '@angular/router';
import {Student} from '../../../models/student';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {Observable} from 'rxjs';
import {Attachment} from '../../../models/attachment';



function getBase64(file, cb) {
  const reader = new FileReader();
  reader.onload = (event) => cb(reader.result);
  reader.readAsDataURL(file);
}
@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  MAJOR_LIST: string[] = [
    'SI',
    'MAM',
    'GB',
    'GE',
    'ELEC' ];

  YEAR_LIST: string[] = [
    '3',
    '4',
    '5'
  ];

  public studentForm: FormGroup;
  public attachmentForm: FormGroup;
  public user: User;
  public attachments: any[] = [];

  constructor(public formBuilder: FormBuilder,
              public studentService: StudentService,
              private route: ActivatedRoute) {
    this.studentForm = this.formBuilder.group({
      major: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
    this.attachmentForm = this.formBuilder.group({
      transcript: ['', [Validators.required]],
      coveringLetter: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    // this.initializeStudentForm();
  }

  initializeStudentForm() {
    this.studentForm.setValue({
      major: this.user.studentInfo.major,
      year: this.user.studentInfo.year,
    });
    this.attachmentForm.setValue({
      transcript: '',
      coveringLetter: '',
    });
  }

  saveChanges() {
    const student: Student = this.studentForm.getRawValue();
    /*this.user = student;
    console.log(this.user);
    console.log(student);*/
    this.user.studentInfo.major = student.major;
    this.user.studentInfo.year = student.year;
    this.user.studentInfo.attachments = this.attachments;
    this.studentService.updateStudent(this.user).subscribe();
  }

  updateUser(user1: User) {
    this.user = user1;
    console.log(user1);
    this.initializeStudentForm();
  }

  fileChange(event) {
    console.log(event);
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      getBase64(file, (result) => {
        this.attachments.push(
          {
            name: event.target.id,
            data: result
          }
        );
      });
    }
  }
}

