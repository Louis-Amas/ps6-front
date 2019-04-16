import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TeacherService} from '../../../services/teacher/teacher.service';
import {Teacher} from '../../../models/teacher';
import {User} from '../../../models/user';

@Component({
  selector: 'app-teacher-home',
  templateUrl: './teacher-home.component.html',
  styleUrls: ['./teacher-home.component.css']
})
export class TeacherHomeComponent implements OnInit {

  public teacher: User;

  constructor(private route: ActivatedRoute, public teacherService: TeacherService) { }

  ngOnInit() {
    this.getTeacher();
  }

  getTeacher() {
    const id = this.route.snapshot.paramMap.get('id');
    this.teacherService.getTeacherById(id).subscribe(t => {
        this.teacher = t;
      }
    );
  }
}
