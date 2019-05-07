import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UniversityService} from '../../../../services/university/university.service';
import {University} from '../../../../models/university';
import {Course} from '../../../../models/course';
import {MatDialog} from '@angular/material';
import {AddCourseOverviewDialogComponent} from '../../../commons/add-course-overview-dialog/add-course-overview-dialog';
import {User} from '../../../../models/user';
import {TeacherService} from '../../../../services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-university-details',
  templateUrl: './teacher-university-details.component.html',
  styleUrls: ['./teacher-university-details.component.css']
})
export class TeacherUniversityDetailsComponent implements OnInit {

  university: University;
  teacher: User;

  constructor(private route: ActivatedRoute, public universityService: UniversityService,
              public dialog: MatDialog, public teacherService: TeacherService) { }

  ngOnInit() {
    this.getCurrentUniversity();
    this.getTeacher();
  }

  getCurrentUniversity() {
    const id = this.route.snapshot.paramMap.get('univId');
    this.universityService.getUniversityById(id).subscribe(univ => {
        this.university = univ;
      }
    );
  }

  deleteCourse(course: Course) {
    this.universityService.deleteCourse(course, this.university._id).subscribe();
    this.getCurrentUniversity();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseOverviewDialogComponent, {
      height: '500px',
      width: '800px',
      data: {
        univ: this.university,
        user: this.teacher,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.university = result;
      }
      this.getCurrentUniversity();
    });

  }

  getTeacher() {
    const id = this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacherById(id).subscribe(t => {
        this.teacher = t;
      }
    );
  }

}
