import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../services/student/student.service';
import {TeacherService} from '../../../services/teacher/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user';
import {Wish} from '../../../models/wish';

@Component({
  selector: 'app-teacher-student-page',
  templateUrl: './teacher-student-details.component.html',
  styleUrls: ['./teacher-student-details.component.css']
})
export class TeacherStudentDetailsComponent implements OnInit {

  public currentStudent: User;
  public teacher: User;
  public wishes: Wish[];

  constructor(public studentService: StudentService, public teacherService: TeacherService,
              public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.getStudent();
    this.getTeacher();
    this.getStudentWishes();
  }

  getStudent() {
    const id = this.route.snapshot.paramMap.get('stuId');
    this.studentService.getUserById(id).subscribe( student => {
      this.currentStudent = student;
    });
  }

  getTeacher() {
    const id = this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacherById(id).subscribe( student => {
      this.teacher = student;
    });
  }

  getStudentWishes() {
    const id = this.route.snapshot.paramMap.get('stuId');
    this.studentService.getWishesOfOneStudent(id).subscribe( wishes => {
      this.wishes = wishes;
    });
  }

  validateStudent() {
    this.studentService.updateStudentState(this.currentStudent._id, 'waitBriVerif').subscribe(() => {
      this.router.navigate([`/teacher/` + this.teacher._id]);
    });
  }
}
