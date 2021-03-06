import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/user';
import {TeacherService} from '../../../../services/teacher/teacher.service';
import {StudentService} from '../../../../services/student/student.service';

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
  major: string;

  @Output()
  studentsConcernedEvent: EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(public teacherService: TeacherService, public studentService: StudentService) {
  }

  ngOnInit() {
    this.getConcernedStudent();
  }


  getConcernedStudent() {
    this.studentService.getStudentsByStatus('waitTeacher', this.teacher.teacherInfo.responsible).subscribe(t => {
      this.studentsConcerned = t;
      this.studentsFilter = t;
      this.studentsConcernedEvent.emit(this.studentsConcerned);
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

  updateMajor(major: string) {
    this.major = major;
    this.filterStudent();
  }

  filterStudent() {
    this.studentsFilter = this.teacherService.filterStudent(this.teacher._id, this.studentsConcerned, this.university,
      this.searchBar, this.major);
  }
}
