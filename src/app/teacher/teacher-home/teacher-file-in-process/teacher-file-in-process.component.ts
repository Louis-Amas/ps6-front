import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {TeacherService} from '../../../../services/teacher/teacher.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-teacher-file-in-process',
  templateUrl: './teacher-file-in-process.component.html',
  styleUrls: ['./teacher-file-in-process.component.css']
})
export class TeacherFileInProcessComponent implements OnInit {

  @Input() teacher: User;

  studentsConcerned: User[] = [];
  studentsFilter: User[] = [];
  university: string;
  searchBar: string;

  constructor(private route: ActivatedRoute, public teacherService: TeacherService) {
  }

  ngOnInit() {
    this.getConcernedStudent();
  }


  getConcernedStudent() {
    this.teacherService.getConcernedStudent(this.teacher._id).subscribe(t => {
      this.studentsConcerned = t;
      this.studentsFilter = t;
    });
  }

  updateUniversity(univ: string) {
    this.university = univ;
    this.filterStudent();
  }

  updateName(name: string) {
    if (name !== undefined) {
      this.searchBar = name;
    }
    this.filterStudent();
  }

  filterStudent() {
    this.studentsFilter = this.teacherService.filterStudent(this.teacher._id, this.studentsConcerned, this.university, this.searchBar);
  }
}
