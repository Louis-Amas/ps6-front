import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UniversityService} from '../../../../services/university/university.service';
import {University} from '../../../../models/university';
import {Course} from '../../../../models/course';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {AddCourseOverviewDialogComponent} from '../../../commons/add-course-overview-dialog/add-course-overview-dialog';
import {User} from '../../../../models/user';
import {TeacherService} from '../../../../services/teacher/teacher.service';

@Component({
  selector: 'app-teacher-university-details',
  templateUrl: './teacher-university-details.component.html',
  styleUrls: ['./teacher-university-details.component.css']
})
export class TeacherUniversityDetailsComponent implements OnInit {

  private displayedColumns: string[] = ['name', 'ECTS', 'semester', 'description', 'delete'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  university: University;
  teacher: User;

  constructor(private route: ActivatedRoute, public universityService: UniversityService,
              public dialog: MatDialog, public teacherService: TeacherService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getTeacher();
  }

  getCurrentUniversity() {
    const id = this.route.snapshot.paramMap.get('univId');
    this.universityService.getUniversityById(id).subscribe(univ => {
        this.university = univ;
        this.filterUniv();
        this.dataSource = new MatTableDataSource<User>(this.university.courses);
      }
    );
  }

  deleteCourse(course: Course) {
    this.universityService.deleteCourse(course, this.university._id).subscribe(u => {
      this.university = u;
      this.filterUniv();
      this.dataSource = new MatTableDataSource<User>(this.university.courses);
      this.openSnackBarDelete();
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseOverviewDialogComponent, {
      height: '600px',
      width: '1000px',
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
      this.openSnackBarAdd();
    });

  }

  getTeacher() {
    const id = this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacherById(id).subscribe(t => {
        this.teacher = t;
        this.getCurrentUniversity();
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

  filterUniv() {
    this.university.courses = this.university.courses.filter(c => {
      return c.major.toString() === this.teacher.teacherInfo.responsible.toString();
    });
  }

  openSnackBarDelete() {
    this.snackBar.open( 'Cours supprimé !', undefined, {
      duration: 4000,
    });
  }

  openSnackBarAdd() {
    this.snackBar.open( 'Cours ajouté !', undefined, {
      duration: 4000,
    });
  }

}
