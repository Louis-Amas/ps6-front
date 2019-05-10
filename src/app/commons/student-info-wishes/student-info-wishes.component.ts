import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {StudentService} from '../../../services/student/student.service';

@Component({
  selector: 'app-student-info-wishes',
  templateUrl: './student-info-wishes.component.html',
  styleUrls: ['./student-info-wishes.component.css']
})
export class StudentInfoWishesComponent implements OnInit {

  @Input() currentStudent: User;

  constructor(public studentService: StudentService) { }

  ngOnInit() {
  }

}
