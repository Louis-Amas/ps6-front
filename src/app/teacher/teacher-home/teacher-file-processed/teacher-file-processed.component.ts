import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-teacher-file-processed',
  templateUrl: './teacher-file-processed.component.html',
  styleUrls: ['./teacher-file-processed.component.css']
})
export class TeacherFileProcessedComponent implements OnInit {

  @Input() teacher: User;

  constructor() { }

  ngOnInit() {
  }

}
