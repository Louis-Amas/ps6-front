import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../services/student/student.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';

@Component({
  selector: 'app-student-messages',
  templateUrl: './student-messages.component.html',
  styleUrls: ['./student-messages.component.css']
})
export class StudentMessagesComponent implements OnInit {

  public student: User;

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getStudentByid();
  }

  getStudentByid() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.getUserById(id).subscribe(student => {
      this.student = student;
    });
  }
}
