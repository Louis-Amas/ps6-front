import { Component, OnInit } from '@angular/core';
import {StudentService} from '../../services/student/student.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.css']
})
export class ConnectionComponent implements OnInit {

  constructor(public studentService: StudentService) { }

  ngOnInit() {
  }

}
