import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user';
import {Wish} from '../../../../models/wish';
import {StudentService} from '../../../../services/student/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BriService} from '../../../../services/bri/bri.service';
import {MatTableDataSource} from '@angular/material';
import {FILE_MOCKED} from '../../../../mocks/file.mocks';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  public currentStudent: User;
  public bri: User;
  public wishes: Wish[];

  public FILE_LIST: any[] = [];

  private displayedColumns: string[] = ['year', 'schoolLevel', 'school', 'note', 'file'];
  dataSource = new MatTableDataSource();

  constructor(public studentService: StudentService, public briService: BriService,
              public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.getStudent();
    this.getBri();
  }


  getStudent() {
    const id = this.route.snapshot.paramMap.get('stuId');
    this.studentService.getUserById(id).subscribe( student => {
      this.currentStudent = student;
      this.dataSource = new MatTableDataSource<any>(this.currentStudent.studentInfo.notes);
      FILE_MOCKED.forEach(f => {
        this.FILE_LIST.push(Object.assign({}, f));
      });
      this.updateFileList();

    });
  }

  getBri() {
    const id = this.route.snapshot.paramMap.get('id');
    this.briService.getBriById(id).subscribe( b => {
      this.bri = b;
    });
  }

  acceptStudent() {
    this.studentService.updateStudentState(this.currentStudent._id, 'waitValidate').subscribe(() => {
      this.router.navigate([`/bri/` + this.bri._id]);
    });
  }

  refuseStudent() {
    this.studentService.updateStudentState(this.currentStudent._id, 'waitStudent').subscribe();
  }

  download(filename) {
    const data = this.currentStudent.studentInfo.attachments.filter(a => a.name === filename)[0].data;
    const element = document.createElement('a');
    element.setAttribute('href', data);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  downloadFileMark(element: any) {
    console.log(element.note);
    const filename = this.studentService.createFileNameWithNote(element, null);
    console.log('bo');
    const file = this.currentStudent.studentInfo.attachments.filter(a => a.name.split('.')[0] === filename);
    if (file.length > 0) {
      this.download(file[0].name);
    }
  }

  updateFileList() {
    this.currentStudent.studentInfo.attachments.forEach(a => {
      this.FILE_LIST.forEach(f => {
        if (a.name.split('.')[0] === f.file) {
          f.used = true;
          f.nameFinal = a.name;
        }
      });
    });
  }



}
