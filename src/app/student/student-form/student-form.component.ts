import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../../services/student/student.service';
import {ActivatedRoute} from '@angular/router';
import {Student} from '../../../models/student';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';

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
  public user: User;

  constructor(public formBuilder: FormBuilder, public studentService: StudentService, private route: ActivatedRoute) {
    this.studentForm = this.formBuilder.group({
      major: ['', [Validators.required]],
      year: ['', [Validators.required]]
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
}

  saveChanges() {
    const student: Student = this.studentForm.getRawValue() as Student;
    this.user.studentInfo.major = student.major;
    this.user.studentInfo.year = student.year;
    this.studentService.updateStudent(this.user).subscribe(user => console.log(user));
  }

  updateUser(user1: User) {
    this.user = user1;
    this.initializeStudentForm();
  }

}

