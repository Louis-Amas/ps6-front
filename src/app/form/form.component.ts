import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public form: FormGroup;

  public user: User;

  @Output() currentUser = new EventEmitter<User>();

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute, public studentService: StudentService) {
    this.form = this.formBuilder.group({
      _id: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.studentService.getUserById(userId)
      .subscribe(user => {
        this.user = user;
        console.log(this.user);
        this.form.setValue({
          _id: userId,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          email: user.email
        });
        this.currentUser.emit(this.user);
      });
  }

}
