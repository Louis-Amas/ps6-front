import { Component, OnInit } from '@angular/core';
import {Student} from '../../../models/student';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../../services/student/student.service';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {

  public student: Student;

  constructor(private route: ActivatedRoute,
              private studentService: StudentService) { }

  ngOnInit() {
    this.getStudent();
  }

  getStudent() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentById(id).subscribe( student => {
      this.student = student;
    });
  }
}