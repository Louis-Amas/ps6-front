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
    this.connection.connection$.subscribe((isConnected) => {
      if (isConnected) {
        this.router.navigate([`student/${this.connection.student._id}`]);
      }
    });
  }

  tryToConnect() {
    const studentToConnect: Student = this.studentForm.getRawValue() as Student;
    this.connection.connectWithCredientials(studentToConnect.email, studentToConnect.password);
  }

  getErrorEmailMessage() {
    return this.email.hasError('required') ? 'Vous devez entrer un e-mail' : '';
  }

  getErrorPasswordMessage() {
    return this.password.hasError('required') ? 'Vous devez entrer un mot de passe' : '';
  }
}
