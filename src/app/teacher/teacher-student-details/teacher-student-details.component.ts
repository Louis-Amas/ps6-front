import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../../services/student/student.service';
import {TeacherService} from '../../../services/teacher/teacher.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../../../models/user';
import {Wish} from '../../../models/wish';
import {MatDialog, MatSnackBar} from '@angular/material';
import {WishOverviewDialogComponent} from '../wish-overview-dialog/wish-overview-dialog.component';

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
              public route: ActivatedRoute, public router: Router, public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getStudent();
    this.getTeacher();
  }

  getStudent() {
    const id = this.route.snapshot.paramMap.get('stuId');
    this.studentService.getUserById(id).subscribe( student => {
      this.currentStudent = student;
      this.getStudentWishes();
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
      this.currentStudent.studentInfo.wishes = wishes;
    });
  }

  validateStudent() {
    this.studentService.updateStudentState(this.currentStudent._id, 'waitBriVerif').subscribe(() => {
      this.router.navigate([`/teacher/` + this.teacher._id]);
      this.openSnackBar();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WishOverviewDialogComponent, {
      height: '500px',
      width: '800px',
      data: {
              student: this.currentStudent,
              teacher : this.teacher }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.studentService.updateStudentState(this.currentStudent._id, 'waitStudent').subscribe(() => {
          this.router.navigate([`/teacher/` + this.teacher._id]);
        });
      }
    });
  }

  openSnackBar() {
    this.snackBar.open( 'Vous avez validé le dossier de cet étudiant !', undefined, {
      duration: 4000,
    });
  }
}
