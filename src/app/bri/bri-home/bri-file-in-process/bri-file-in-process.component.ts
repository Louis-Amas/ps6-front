import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../models/user';
import {MatSort, MatTableDataSource} from '@angular/material';
import {StudentService} from '../../../../services/student/student.service';
import { Student} from '../../../../models/student';

@Component({
  selector: 'app-bri-file-in-process',
  templateUrl: './bri-file-in-process.component.html',
  styleUrls: ['./bri-file-in-process.component.css']
})
export class BriFileInProcessComponent implements OnInit {

  private displayedColumns: string[] = ['firstName', 'lastName'];
  dataSource = new MatTableDataSource();

  @Input() bri: User;

  constructor(private studentService: StudentService) {
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    console.log(this.dataSource.sort);
    this.dataSource.sort = this.sort;
    this.studentService.getAllStudents()
      .subscribe(students => this.dataSource = new MatTableDataSource<User>(students));
  }

  test(event) {
    console.log(event);
  }
}

