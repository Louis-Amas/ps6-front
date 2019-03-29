import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../models/student';
import {UniversityService} from '../../services/university/university.service';
import {University} from '../../models/university';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../services/student/student.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Course} from '../../models/course';

@Component({
  selector: 'app-student-wish-form',
  templateUrl: './student-wish-form.component.html',
  styleUrls: ['./student-wish-form.component.css']
})
export class StudentWishFormComponent implements OnInit {

  student: Student;
  countries: string[];
  public universitiesList: University[] = [];

  courses: Course[];

  university: University;

  public wishForm: FormGroup;

  constructor(public formBuilder: FormBuilder, private route: ActivatedRoute,
              private studentService: StudentService, public universityService: UniversityService) {

    this.wishForm = this.formBuilder.group({
      semester: [''],
      country: [''],
      university: [''],
    });
    this.universityService.getUniversities();
    this.universityService.universities$.subscribe((univ) => this.universitiesList = univ);

  }


  ngOnInit() {
    this.getCountry();
    this.getStudent();
  }

  getCountry() {
    this.countries = this.universityService.getCountries();
  }

  getUniversityByCountryAndMajor(country: string, concernedDepartment: string) {
    this.universityService.getUniversitiesByCountryAndMajor(country, concernedDepartment).subscribe( univ =>
      this.universitiesList = univ);
  }

  getStudent() {
    const id = this.route.snapshot.paramMap.get('id');
    this.studentService.getStudentById(id).subscribe(s => this.student = s);
  }

  validateForm() {
    const name = this.wishForm.get('university').value;
    this.university = this.universitiesList.find(x => x.name === name);
    const semester = this.wishForm.get('semester').value;
    this.courses = this.university.courses.filter(x => {
      return x.semester.valueOf() == semester && x.major === this.student.major;
    });
    console.log(this.courses);
  }


}
