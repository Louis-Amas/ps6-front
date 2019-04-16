import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {TeacherService} from '../../../../services/teacher/teacher.service';
import {ActivatedRoute} from '@angular/router';
import {University} from '../../../../models/university';

@Component({
  selector: 'app-teacher-file-in-process',
  templateUrl: './teacher-file-in-process.component.html',
  styleUrls: ['./teacher-file-in-process.component.css']
})
export class TeacherFileInProcessComponent implements OnInit {

  @Input() teacher: User;

  studentsConcerned: User[] = [];
  university: string;

  constructor(private route: ActivatedRoute, public teacherService: TeacherService) {
  }

  ngOnInit() {
    this.getConcernedStudent();
  }


  getConcernedStudent() {
    this.teacherService.getConcernedStudent(this.teacher._id).subscribe( t => this.studentsConcerned = t);
  }

  updateUniversity(univ: string) {
    this.university = univ;
  }

  filterStudent() {

  }

}
