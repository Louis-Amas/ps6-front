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
  universities: University[];

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
  }


  ngOnInit() {
    this.getCountry();
    this.getUniversity();
    this.getStudent();

  }

  getUniversity() {
    this.universities = this.universityService.universityList;
  }
  getCountry() {
    this.countries = this.universityService.getCountries();
  }

  getUniversityByCountryAndMajor(country: string) {
    return this.universities.filter(x => x.country === country  && x.concernedDepartement
      === this.student.major);
  }

  getStudent() {
    /*const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.students$.subscribe( x => {
      x.forEach( s => {
        if (s._id === id) {
          this.student = s;
          console.log(this.student);
        }
      });
    });*/
  }

  validateForm() {
    const name = this.wishForm.get('university').value;
    this.university = this.universities.find(x => x.name === name);
    const semester = this.wishForm.get('semester').value;
    /*
    console.log(semester);
    console.log(this.university);
    console.log(this.universities); */
    this.courses = this.university.courses.filter(x => {
      return x.semester.valueOf() == semester && x.major === this.student.major;
    });
    console.log(this.courses);
  }


}
