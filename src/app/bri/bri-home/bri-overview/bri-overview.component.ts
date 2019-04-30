import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../models/user';
import {MatSort, MatTableDataSource} from '@angular/material';
import {StudentService} from '../../../../services/student/student.service';
import {Student} from '../../../../models/student';
import {University} from '../../../../models/university';
import {UniversityService} from '../../../../services/university/university.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-bri-overview',
  templateUrl: './bri-overview.component.html',
  styleUrls: ['./bri-overview.component.css']
})
export class BriOverviewComponent implements OnInit {

  @Input() bri: User;

  public universityForm: FormGroup;
  private displayedColumns: string[] = ['firstName', 'lastName'];
  private notRankedStudent: User[];
  private universities: University[];
  private rankedStudent: User[];
  dataSource = new MatTableDataSource();

  constructor(private studentService: StudentService,
              private universityService: UniversityService,
              private formBuilder: FormBuilder) {
    this.universityForm = this.formBuilder.group({
      university: ['']
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.studentService.getStudentsByStatus('waitValidate')
      .subscribe(students => {
        this.notRankedStudent = students;
        this.dataSource = new MatTableDataSource<User>(students);
      });

    this.universityService
      .getUniversitiesObservable()
      .subscribe((universities) => this.universities = universities);

  }

  chooseUniversity() {
    const univ = this.universityForm.getRawValue().university;
    if (univ === '') { return; }
    this.universityService.getUniversityById(univ._id)
      .subscribe(univProcessed => {
        this.rankedStudent = univProcessed.rankings as User[];
      });
  }

  test(event) {
    console.log(event);
  }
}
