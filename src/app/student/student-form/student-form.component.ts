import {Component, OnInit} from '@angular/core';
import {StudentService} from '../../../services/student/student.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../models/user';
import {DomSanitizer} from '@angular/platform-browser';


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

  SPE_LIST: any[];

  MAJOR_LIST: any[] = [
    {
      major: 'BAT',
      specialty: []
    },
    {
      major: 'SI',
      specialty: ['Architecture logicielle', 'Cryptographie, sécurité et vie privée dans les applications et les réseaux',
        'Intelligence Ambiante', 'Interactions Homme - Machine', 'Sciences, Technologies, Ressources et Applications du Web',
        'Informatique et Mathématiques Appliquées à la Finance et à l\'Assurance', 'Science des Données']
    },
    {
      major: 'MAM',
      specialty: ['Informatique et mathématiques appliquées à la finance et l\'assurance', 'Ingénierie numérique',
        'Science des données']
    },
    {
      major: 'ELEC',
      specialty: ['Conception de circuits et systèmes', 'Génie du système embarqué', 'Télécommunications et réseaux ']
    },
    {
      major: 'GB',
      specialty: ['Pharmacologie et Biotechnologie', 'Toxicologie et Sécurité en Santé et Environnement',
        'Bioinformatique et Modélisation pour la Biologie']
    },
    {
      major: 'GE',
      specialty: ['Exploitation des services publics de l\'eau', 'Hydroinformatique']
    },
  ];

  public attachmentForm: FormGroup;
  public specialityForm: FormGroup;
  public noteForm: FormGroup;
  public attachments: any[] = [];

  public userDetails: User;

  constructor(public formBuilder: FormBuilder,
              public studentService: StudentService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
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
        this.SPE_LIST = this.MAJOR_LIST.filter(m => m.major === user.studentInfo.major)[0].specialty;
        this.updateFileList();
    });
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
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

  download(filename) {
    const data = this.userDetails.studentInfo.attachments.filter(a => a.name === filename)[0].data;
    const element = document.createElement('a');
    element.setAttribute('href', data);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  updateSpecialty() {
    this.studentService.updateStudentLastYearSpeciality(this.userDetails._id, this.specialityForm.value.speciality.toString())
      .subscribe(stu => {
        this.userDetails = stu;
    });
  }

  updateFileList() {
    this.userDetails.studentInfo.attachments.forEach(a => {
      this.FILE_LIST.forEach(f => {
        if (a.name.split('.')[0] === f.file) {
          f.used = true;
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
      this.updateFileList();
    });
  }

}

