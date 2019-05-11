import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../services/student/student.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';


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
      used: false,
    },
    {
      name: 'Lettre de Motivation',
      file: 'lettreMotivation',
      used: false,
    },
    {
      name: 'Certificat de Compétence Linguistique',
      file: 'compLinguistique',
      used: false,
    },
    {
      name: 'Carte Européenne',
      file: 'carteEuro',
      used: false,
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
      console.log(a.name.split('.')[0]);
      this.FILE_LIST.forEach(f => {
        if (a.name.split('.')[0] === f.file) {
          f.used = true;
          f.data = a.data;
          f.nameFinal = a.name;
        }
      });
    });
  }

  validateFile(fileName) {
    if (this.attachments.length === 0) {
      return;
    }
    const attach = this.attachments.filter(a => a.name.split('.')[0] === fileName)[0];
    this.FILE_LIST.map(f => {
      if (f.name === fileName) {
        f.used = true;
      }
    });
    this.studentService.uploadFile(attach, this.userDetails._id).subscribe(student => {
      this.userDetails = student;
    });
  }

  download(filename, data) {
    const elem = window.document.createElement('a');
    elem.href = data;
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

