import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../../models/student';
import {UniversityService} from '../../../services/university/university.service';
import {University} from '../../../models/university';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../../services/student/student.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Course} from '../../../models/course';
import {CourseService} from '../../../services/course/course.service';

@Component({
  selector: 'app-student-wish-form',
  templateUrl: './student-wish-form.component.html',
  styleUrls: ['./student-wish-form.component.css']
})
export class StudentWishFormComponent implements OnInit {

  student: Student;
  countries: string[];
  public universitiesList: University[];
  public universitiesChangedList: University[];

  country: string;

  courses: Course[];
  coursesSelected: Course[];

  university: University;

  nbECTS: number;

  public wishForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute,
              private studentService: StudentService, public universityService: UniversityService,
              public courseService: CourseService) {

    this.wishForm = this.formBuilder.group({
      semester: [''],
      country: [''],
      university: [''],
    });
    this.universityService.universities$.subscribe((univ) => this.universitiesList = univ);
    this.universityService.countries$.subscribe((countries) => this.countries = countries);
    this.coursesSelected = [];
    this.nbECTS = 0;

  }


  ngOnInit() {
    this.getStudent();
    this.universityService.getUniversities();
  }


  getUniversityByCountryAndMajor(event, country: string, concernedDepartment: string) {
    if (event.source.selected === true) {
      this.universitiesChangedList = this.universitiesList.filter(univ => univ.country === country &&
        concernedDepartment === univ.concernedDepartement);
    }
  }

  getStudent() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentById(id).subscribe(s => this.student = s);
  }

  validateForm() {
    const name = this.wishForm.get('university').value;
    this.university = this.universitiesList.find(x => x.name === name);
    const semester = this.wishForm.get('semester').value;
    this.getCoursesByUniv(this.university._id, semester);
  }

  getCoursesByUniv(id: string, semester: number) {
    this.courseService.getCoursesByUniversity(id, semester).subscribe(courses => {
      this.courses = courses;
    });
  }

  addCourse(event, course: Course) {
    if (event.checked === true) {
      this.coursesSelected.push(course);
      this.nbECTS += course.ECTS_count;
    }
    if (event.checked === false) {
      this.coursesSelected.splice(0, this.coursesSelected.indexOf(course));
      this.nbECTS -= course.ECTS_count;
    }
  }


}
