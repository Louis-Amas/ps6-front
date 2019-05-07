import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {UniversityService} from '../../../../services/university/university.service';
import {FormBuilder} from '@angular/forms';
import {University} from '../../../../models/university';
import {Course} from '../../../../models/course';
import {StudentService} from '../../../../services/student/student.service';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-update-wish-overview-dialog',
  templateUrl: './update-wish-overview-dialog.component.html',
  styleUrls: ['./update-wish-overview-dialog.component.css']
})
export class UpdateWishOverviewDialogComponent implements OnInit {

  university: University;

  nbECTS: number;

  coursesSelected: Course[];

  private displayedColumns: string[] = ['checked', 'name', 'ECTS', 'semester', 'description'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialogRef: MatDialogRef<UpdateWishOverviewDialogComponent>, private route: ActivatedRoute,
              private universityService: UniversityService, private studentService: StudentService,
              @Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder) {

      this.university = data.wishUpdate.university;
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<User>(this.university.courses);
    this.coursesSelected = [];
    this.nbECTS = 0;

  }

  addCourse(event, course: Course) {
    if (event.checked === true) {
      this.coursesSelected.push(course);
      this.nbECTS += course.ECTS_count;
    }
    if (event.checked === false) {
      this.coursesSelected = this.coursesSelected.filter(c => c !== course);
      this.nbECTS -= course.ECTS_count;
    }
  }

  validateWish() {
    const coursesId = [];
    this.coursesSelected.forEach(course => coursesId.push(course._id));
    this.studentService.updateWish(this.data.student, this.university._id, this.coursesSelected).subscribe(res => {
        this.dialogRef.close(res);
    }
    );
  }

  orderList(event) {
    const column = event.active;
    if (event.direction === 'asc') {
      this.university.courses.sort((a, b) => {
        if (a[column] > b[column]) {
          return 1;
        } else {
          if (a[column] < b[column]) {
            return -1;
          } else {
            if (a[column] === b[column]) {
              return 0;
            }
          }
        }
      });
    } else {
      this.university.courses.sort((a, b) => {
        if (a[column] < b[column]) {
          return 1;
        } else {
          if (a[column] > b[column]) {
            return -1;
          } else {
            if (a[column] === b[column]) {
              return 0;
            }
          }
        }
      });
    }
    this.dataSource = new MatTableDataSource<User>(this.university.courses);
  }
}
