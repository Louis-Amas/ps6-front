import {Component, OnInit, ViewChild} from '@angular/core';
import {UniversityService} from '../../../services/university/university.service';
import {University} from '../../../models/university';
import {ActivatedRoute, Router} from '@angular/router';
import {StudentService} from '../../../services/student/student.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Course} from '../../../models/course';
import {CourseService} from '../../../services/course/course.service';
import {User} from '../../../models/user';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {AddCourseOverviewDialogComponent} from '../../commons/add-course-overview-dialog/add-course-overview-dialog';

@Component({
  selector: 'app-student-wish-form',
  templateUrl: './student-wish-form.component.html',
  styleUrls: ['./student-wish-form.component.css']
})
export class StudentWishFormComponent implements OnInit {

  private displayedColumns: string[] = ['checked', 'name', 'ECTS', 'semester', 'description'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;

  student: User;
  countries: string[];
  public universitiesList: University[];
  public universitiesChangedList: University[] = [];

  country: string;

  courses: Course[];
  coursesSelected: Course[];

  university: University;

  nbECTS: number;

  error: boolean;

  public wishForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute,
              private studentService: StudentService, public universityService: UniversityService,
              public courseService: CourseService, public dialog: MatDialog, public router: Router, public snackBar: MatSnackBar) {

    this.wishForm = this.formBuilder.group({
      semester: [''],
      country: [''],
      university: [''],
    });
    this.universityService.universities$.subscribe((univ) => this.universitiesList = univ);
    this.universityService.countries$.subscribe((countries) => this.countries = countries);
    this.coursesSelected = [];
  }


  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getStudent();
    this.universityService.getUniversities();
    this.nbECTS = 0;
    this.error = false;
  }


  getUniversityByMajor(concernedDepartment: string) {
    this.universityService.getByMajor(concernedDepartment).subscribe(univ =>
      this.universitiesChangedList = univ);
  }

  getStudent() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentById(id).subscribe(s => {
      this.student = s;
      this.getUniversityByMajor(this.student.studentInfo.major);
      }
    );
  }

  validateForm() {
    const name = this.wishForm.get('university').value;
    this.university = this.universitiesList.find(x => x.name === name);
    const semester = this.wishForm.get('semester').value;
    this.getCoursesByUniv(this.university._id, semester);
    this.error = false;
  }

  getCoursesByUniv(id: string, semester: number) {
    this.courseService.getCoursesByUniversity(id, semester, this.student.studentInfo.major).subscribe(courses => {
      this.courses = courses;
      this.dataSource = new MatTableDataSource<User>(this.courses);
    });
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
    this.nbECTS = 0;
    this.coursesSelected.forEach(course => coursesId.push(course._id));
    this.studentService.addWish(coursesId, this.university._id, this.student._id).subscribe(() => {
      this.router.navigate([`student/${this.student._id}`]);
      this.openSnackBar();
    }, () => {
      this.error = true;
    });
  }

  orderList(event) {
    const column = event.active;
    if (event.direction === 'asc') {
      this.courses.sort((a, b) => {
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
      this.courses.sort((a, b) => {
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
    this.dataSource = new MatTableDataSource<User>(this.courses);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(AddCourseOverviewDialogComponent, {
      height: '600px',
      width: '1000px',
      data: {
        univ: this.university,
        user: this.student,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.nbECTS = 0;
        this.coursesSelected = [];
        this.university = result;
        const semester = this.wishForm.get('semester').value;
        this.getCoursesByUniv(this.university._id, semester);
      }
    });

  }

  openSnackBar() {
    this.snackBar.open( 'Vous avez formulé un voeu !', undefined, {
      duration: 4000,
    });
  }

}
