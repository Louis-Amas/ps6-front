import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user';
import {Wish} from '../../../../models/wish';
import {StudentService} from '../../../../services/student/student.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BriService} from '../../../../services/bri/bri.service';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  public currentStudent: User;
  public bri: User;
  public wishes: Wish[];

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
      // this.getStudentWishes();
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


}
