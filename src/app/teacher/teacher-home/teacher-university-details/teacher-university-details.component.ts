import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UniversityService} from '../../../../services/university/university.service';
import {University} from '../../../../models/university';
import {Course} from '../../../../models/course';

@Component({
  selector: 'app-teacher-university-details',
  templateUrl: './teacher-university-details.component.html',
  styleUrls: ['./teacher-university-details.component.css']
})
export class TeacherUniversityDetailsComponent implements OnInit {

  university: University;

  constructor(private route: ActivatedRoute, public universityService: UniversityService) { }

  ngOnInit() {
    this.getCurrentUniversity();
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


}
