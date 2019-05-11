import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../services/student/student.service';
import {ActivatedRoute} from '@angular/router';
import {Student} from '../../../models/student';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {isElementScrolledOutsideView} from '@angular/cdk/overlay/typings/position/scroll-clip';


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

  FILE_LIST: any[] = [
    {
      name: 'Curriculum Vitae',
      file: 'cv',
      used: false
    },
    {
      name: 'Lettre de Motivation',
      file: 'lettreMotivation',
      used: false
    },
    {
      name: 'Certificat de Compétence Linguistique',
      file: 'compLinguistique',
      used: false
    },
    {
      name: 'Carte Européenne',
      file: 'carteEuro',
      used: false
    }
  ];

  SPE_LIST: string[] = [
    'info',
    'dev',
    'test'
  ];

  public studentForm: FormGroup;
  public attachmentForm: FormGroup;
  public specialityForm: FormGroup;
  public noteForm: FormGroup;
  public attachments: any[] = [];

  public userDetails: User;

  constructor(public formBuilder: FormBuilder,
              public studentService: StudentService,
              private route: ActivatedRoute) {
    this.attachmentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      value: [''],
      nameAssociate: ['']
    });
    this.specialityForm = this.formBuilder.group({
      speciality: ['', [Validators.required]]
    });
    this.noteForm = this.formBuilder.group({
      year: ['', [Validators.required]],
      schoolLevel: ['', [Validators.required]],
      school: ['', [Validators.required]],
      note: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    this.studentService.getUserById(userId).subscribe(user => {
        this.userDetails = user;
        console.log(user);
        this.updateFileList();
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
        ohterDocs: '',
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
      otherDocs: '',
    });
    this.studentService.updateStudent(this.userDetails).subscribe(user => console.log(user));
  }

  updateUser(user1: User) {
    this.userDetails.firstName = user1.firstName;
    this.userDetails.lastName = user1.lastName;
    this.userDetails.email = user1.email;
    this.userDetails.phoneNumber = user1.phoneNumber;
    this.initializeStudentForm();
  }

  fileChange(event, fileName) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const name1: string = file.name;
      getBase64(file, (result) => {
        let find = false;
        this.attachments.forEach(a => {
          if (a.name.split('.', 1)[0] === fileName) {
            a.name = fileName + '.' + name1.split('.')[1];
            a.data = result;
            find = true;
          }
        });
        if (!find) {
          this.attachments.push(
            {
              name: fileName + '.' + name1.split('.')[1],
              data: result
            }
          );
        }
      });
    }
  }

  updateFileList() {
    this.userDetails.studentInfo.attachments.forEach(a => {
      const res = this.FILE_LIST.reduce(f => a.name.split('.')[1] === f.file);
      if (res) {
        console.log('bo');
        res.used = true;
      }
    });
  }

  validateFile(fileName) {
    if (this.attachments.length === 0) {
      return;
    }
    const attach = this.attachments.reduce(a => a.name.split('.')[1] === fileName);
    console.log(attach);
    this.studentService.uploadFile(attach, this.userDetails._id).subscribe(student => {
      console.log('la');
      console.log(student);
    });
  }
}

