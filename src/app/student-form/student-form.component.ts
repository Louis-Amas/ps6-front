import { Component, OnInit } from '@angular/core';
import { StudentService } from '../../services/student/student.service';
import {ActivatedRoute} from '@angular/router';
import {Student} from '../../models/student';
import {FormControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(public formBuilder: FormBuilder, public studentService: StudentService, private route: ActivatedRoute) {
    this.studentForm = this.formBuilder.group({
      _id: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
      major: ['', [Validators.required]],
      year: ['', [Validators.required]]
    });
    this.initializeStudentForm();

  }

  ngOnInit() {
  }

  initializeStudentForm() {
    const studentId = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentById(studentId)
      .subscribe(student => {
        this.studentService.refactorStudent(student);
        this.studentForm.setValue({
          _id: studentId,
          lastName: student.lastName,
          firstName: student.firstName,
          phoneNumber: student.phoneNumber,
          email: student.email,
          major: student.major,
          year: student.year
        });
      });

}

  saveChanges() {
    const student: Student = this.studentForm.getRawValue() as Student;
    this.studentService.updateStudent(student);
  }

}

