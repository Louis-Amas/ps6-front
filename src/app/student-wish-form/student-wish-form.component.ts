import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../models/student';
import {UniversityService} from '../../services/university/university.service';
import {University} from '../../models/university';

@Component({
  selector: 'app-student-wish-form',
  templateUrl: './student-wish-form.component.html',
  styleUrls: ['./student-wish-form.component.css']
})
export class StudentWishFormComponent implements OnInit {

  @Input()
  student: Student;
  countries: string[];
  universities: University[];

  constructor(public universityService: UniversityService) { }

  ngOnInit() {
    this.getCountry();
    this.getUniversity();
  }

  getUniversity() {
    this.universities = this.universityService.universityList;
  }
  getCountry() {
    this.countries = this.universityService.getCountries();
  }

}
