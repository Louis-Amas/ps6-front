import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student/student.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Student} from '../../models/student';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {ConnectionService} from '../../services/connection/connection.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError} from 'rxjs/operators';

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

  constructor(public formBuilder: FormBuilder, public studentService: StudentService,
              public router: Router, public connection: ConnectionService,
              private http: HttpClient) {
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

    const headercontent = studentToConnect.email + ':' + studentToConnect.password;
    localStorage.setItem('token', headercontent);
    console.log(localStorage.getItem('token'));

    this.connection.getIdOfCurrentConnection().subscribe( student => {
      if ( student) {
        this.studentService.getStudentById(student._id);
        const link = 'student/' + student._id;
        this.router.navigate([link]);
      } else {
        this.messageError = 'Adresse email ou mot de passe invalide';
      }
    });
  }

  getErrorEmailMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer un e-mail' : '';
  }

  getErrorPasswordMessage() {
    return this.password.hasError('required') ? 'Vous devez entrer un mot de passe' : '';
  }
}
