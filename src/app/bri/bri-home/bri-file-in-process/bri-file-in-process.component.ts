import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../models/user';
import {StudentService} from '../../../../services/student/student.service';
import {MatSort, MatTableDataSource} from '@angular/material';
import {BriService} from '../../../../services/bri/bri.service';

@Component({
  selector: 'app-bri-file-in-process',
  templateUrl: './bri-file-in-process.component.html',
  styleUrls: ['./bri-file-in-process.component.css']
})
export class BriFileInProcessComponent implements OnInit {

  private displayedColumns: string[] = ['firstName', 'lastName', 'major', 'numberWish', 'details'];
  dataSource = new MatTableDataSource();

  @Input() bri: User;

  @ViewChild(MatSort) sort: MatSort;

  studentsConcerned: User[] = [];
  studentsFilter: User[] = [];

  university: string;
  searchBar: string;
  major: string;

  constructor(public studentService: StudentService, public briService: BriService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.getStudentsByState();
  }

  getStudentsByState() {
    this.studentService.getStudentsByStatus('waitBriVerif').subscribe(s => {
      this.studentsConcerned = s;
      this.studentsFilter = s;
      this.dataSource = new MatTableDataSource<User>(this.studentsConcerned);
    });
  }

  orderList(event) {
    const column = event.active;
    if (event.direction === 'asc') {
      this.studentsFilter.sort((a, b) => {
        if (a[column] > b[column]) {
          return 1;
        } else {
          if (a[column] < b[column]) {
            return -1;
          } else {
            if (a[column] === b[column]) {
              return 0;
            }
          }
        }
      });
    } else {
        this.studentsFilter.sort((a, b) => {
          if (a[column] < b[column]) {
            return 1;
          } else {
            if (a[column] > b[column]) {
              return -1;
            } else {
              if (a[column] === b[column]) {
                return 0;
              }
            }
          }
        });
    }
    this.dataSource = new MatTableDataSource<User>(this.studentsFilter);
  }

  updateUniversity(univ: string) {
    this.university = univ;
    this.filterStudent();
  }

  updateMajor(major: string) {
    if (major !== undefined) {
      this.major = major;
    }
    this.filterStudent();
  }

  updateName(name: string) {
    if (name !== undefined) {
      this.searchBar = name;
    }
    this.filterStudent();
  }

  filterStudent() {
    this.studentsFilter = this.briService.filterStudent(this.bri._id, this.studentsConcerned, this.university, this.searchBar, this.major);
    this.dataSource = new MatTableDataSource<User>(this.studentsFilter);
  }
}

