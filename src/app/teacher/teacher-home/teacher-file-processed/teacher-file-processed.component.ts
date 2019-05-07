import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {TeacherService} from '../../../../services/teacher/teacher.service';
import {StudentService} from '../../../../services/student/student.service';

@Component({
  selector: 'app-teacher-file-processed',
  templateUrl: './teacher-file-processed.component.html',
  styleUrls: ['./teacher-file-processed.component.css']
})
export class TeacherFileProcessedComponent implements OnInit {

  @Input() teacher: User;

  studentsConcerned: User[] = [];
  studentsFilter: User[] = [];
  university: string;
  searchBar: string;

  constructor(public studentService: StudentService, public teacherService: TeacherService) { }

  ngOnInit() {
    this.getConcernedStudent();
  }

  getConcernedStudent() {
    this.studentService.getStudentsByStatus('waitBriVerif').subscribe(t => {
      this.studentsConcerned = t;
      this.studentsFilter = t;
      this.studentService.getStudentsByStatus('waitValidate').subscribe(stu => {
        stu.forEach( s => this.studentsFilter.push(s));
        this.studentService.getStudentsByStatus('validate').subscribe(st => {
          st.forEach(stud => this.studentsFilter.push(stud));
        });
      });
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
