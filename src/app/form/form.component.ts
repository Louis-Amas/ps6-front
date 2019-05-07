import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import { StudentService } from '../../services/student/student.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  public form: FormGroup;

  private formInitialized = false;

  @Input()
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

    this.form.valueChanges.subscribe((user) => this.currentUser.emit(user));
  }

  ngOnInit() {
    // this.initializeForm();
  }

  ngOnChanges() {
    if (this.user && this.user._id && !this.formInitialized) {
      this.initializeForm();
      this.formInitialized = true;
    }
  }

  initializeForm() {
     // const userId = this.route.snapshot.paramMap.get('id');
    if (this.user) {
      this.form.setValue({
        _id: this.user._id,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        email: this.user.email
      });
      // this.currentUser.emit(this.user);
    }
    /*this.studentService.getUserById(userId)
      .subscribe(user => {
        this.user = user;
        this.form.setValue({
          _id: userId,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          email: user.email
        });*/
  }

  updateUser() {
    /*this.user.firstName = this.form.value.firstName;
    this.user.lastName = this.form.value.lastName;
    this.user.phoneNumber = this.form.value.phoneNumber;
    this.user.email = this.form.value.email;*/
    this.form.valueChanges.subscribe((user) => this.currentUser.emit(user));
    // this.currentUser.emit(this.user);
  }

}
