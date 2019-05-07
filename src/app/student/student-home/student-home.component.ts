import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {StudentService} from '../../../services/student/student.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  firstFormGroup = new FormControl('', Validators.required);
  secondFormGroup = new FormControl('', Validators.required);
  thirdFormGroup = new FormControl('', Validators.required);
  fourthFormGroup = new FormControl('', Validators.required);

  studentState: boolean;
  teacherState: boolean;
  briState: boolean;
  validate: boolean;

  pos: number;

  public student: User;

  constructor(private route: ActivatedRoute,
              private studentService: StudentService) { }

  ngOnInit() {
    this.getStudent();
  }

  initState() {
    this.teacherState = false;
    this.briState = false;
    this.validate = false;

    if (this.student.studentInfo.stateValidation === 'waitStudent') {
      this.pos = 0;
      this.studentState = true;
    } else if (this.student.studentInfo.stateValidation === 'waitTeacher') {
      this.pos = 1;
      this.studentState = true;
      this.teacherState = true;
    } else if (this.student.studentInfo.stateValidation === 'waitBriVerif') {
      this.pos = 2;
      this.studentState = true;
      this.teacherState = true;
      this.briState = true;
    } else {
      this.pos = 3;
      this.studentState = true;
      this.teacherState = true;
      this.briState = true;
      this.validate = true;
    }
  }

  getStudent() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.getUserById(id).subscribe( student => {
      this.student = student;
      this.initState();
    });
  }
}
