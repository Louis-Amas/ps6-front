import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {

  @Input() currentStudent: User;

  constructor() { }

  ngOnInit() {
  }

}

