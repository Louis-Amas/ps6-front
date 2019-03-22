import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student/student.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Student} from '../../models/student';
import {Router} from '@angular/router';
import {ConnectionService} from '../../services/connection/connection.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  public studentForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public studentService: StudentService,
              public router: Router, public connection: ConnectionService) {
    // Form creation
    this.studentForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit() {
  }

  getStudentByConnection() {
    const studentToConnect: Student = this.studentForm.getRawValue() as Student;
    const studentFind = this.studentService.studentList.find(x => x.email === studentToConnect.email);
    if (studentFind) {
      if (studentFind.password === studentToConnect.password) {
        const link = 'student/' + studentFind.id;
        this.connection.updateConnection();
        this.router.navigate([link]);
      }
    }
  }
}
