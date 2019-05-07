import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../services/student/student.service';
import {ActivatedRoute} from '@angular/router';
import {Student} from '../../../models/student';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {Observable} from 'rxjs';
import {Attachment} from '../../../models/attachment';



function getBase64(file, cb) {
  const reader = new FileReader();
  reader.onload = (event) => cb(reader.result);
  reader.readAsDataURL(file);
}
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
  public attachmentForm: FormGroup;
  public attachments: any[] = [];

  public userDetails: User;

  constructor(public formBuilder: FormBuilder,
              public studentService: StudentService,
              private route: ActivatedRoute) {
    this.studentForm = this.formBuilder.group({
      major: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });
    this.attachmentForm = this.formBuilder.group({
      transcript: ['', [Validators.required]],
      coveringLetter: ['', [Validators.required]],
    });

  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.studentService.getUserById(userId)
      .subscribe(user => {
        this.userDetails = user;
      });
  }

  initializeStudentForm() {

    if (this.userDetails && this.userDetails.studentInfo) {
      this.studentForm.setValue({
        major: this.userDetails.studentInfo.major,
        year: this.userDetails.studentInfo.year,
      });
      this.attachmentForm.setValue({
        transcript: this.userDetails.studentInfo.attachments[0].name,
        coveringLetter: '',
      });
    }
  }

  saveChanges() {
    const student: Student = this.studentForm.getRawValue();
    this.userDetails.studentInfo.major = student.major;
    this.userDetails.studentInfo.year = student.year;
    this.userDetails.studentInfo.attachments = this.attachments;
    this.attachmentForm.setValue({
      transcript: this.userDetails.studentInfo.attachments[0].name,
      coveringLetter: '',
    });
    /*this.user = student;
    console.log(this.user);
    console.log(student);*/
    this.studentService.updateStudent(this.userDetails).subscribe(user => console.log(user));
  }

  updateUser(user1: User) {
    this.userDetails.firstName = user1.firstName;
    this.userDetails.lastName = user1.lastName;
    this.userDetails.email = user1.email;
    this.userDetails.phoneNumber = user1.phoneNumber;
    this.initializeStudentForm();
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const name1: string = file.name;
      getBase64(file, (result) => {
        this.attachments.push(
          {
            name: name1,
            type: event.target.id,
            data: result
          }
        );
        console.log(event.target.id);
      });
    }
  }
}

