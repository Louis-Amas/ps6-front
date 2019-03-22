import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student/student.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Student} from '../../models/student';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  messageError: string;

  public studentForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public studentService: StudentService, public router: Router) {
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
        this.router.navigate([link]);
      }
    }
    this.messageError = 'Les identifiants sont incorrects ';
  }

  getErrorEmailMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer un e-mail' : '';
  }

  getErrorPasswordMessage() {
    return this.password.hasError('required') ? 'Vous devez entrer un mot de passe' : '';
  }
}
