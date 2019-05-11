import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {UniversityService} from '../../../../services/university/university.service';
import {University} from '../../../../models/university';

@Component({
  selector: 'app-teacher-list-universities',
  templateUrl: './teacher-list-universities.component.html',
  styleUrls: ['./teacher-list-universities.component.css']
})
export class TeacherListUniversitiesComponent implements OnInit {

  @Input() teacher: User;

  universityList: University[] = [];
  universityFilter: University[] = [];


  constructor(public universityService: UniversityService) { }

  ngOnInit() {
    this.getUniversity();
  }

  getUniversity() {
    console.log(this.teacher);
    this.universityService.getByMajor(this.teacher.teacherInfo.responsible).subscribe(univ => {
      this.universityList = univ;
      this.universityFilter = univ;
    });
  }

  onSearch($event) {
    const search = $event.target.value;
    this.universityFilter = this.universityService.filterUniversity(search.toString(), this.universityList);
  }

}
