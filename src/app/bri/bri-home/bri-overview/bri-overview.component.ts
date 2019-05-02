import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../models/user';
import {MatSort, MatTableDataSource} from '@angular/material';
import {StudentService} from '../../../../services/student/student.service';
import {University} from '../../../../models/university';
import {UniversityService} from '../../../../services/university/university.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkDragDrop} from '@angular/cdk/drag-drop';

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
  private currentUniv: University;
  dataSource = new MatTableDataSource();
  dataSourceAlreadyRanked = new MatTableDataSource();

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
    this.studentService.getStudentByStatus('waitValidate')
      .subscribe(students => {
        this.notRankedStudent = students;
        this.dataSource = new MatTableDataSource<User>(students);
      });

    this.universityService
      .getUniversitiesObeservable()
      .subscribe((universities) => this.universities = universities);

  }

  chooseUniversity() {
    const univ = this.universityForm.getRawValue().university;
    this.currentUniv = univ;
    if (univ === '') { return; }
    this.universityService.getUniversityById(univ._id)
      .subscribe(univProcessed => {
        const rankings = univProcessed.rankings as any[];
        this.rankedStudent = rankings.map(ranks => ranks.studentId);
        this.notRankedStudent = this.notRankedStudent
          .filter(student => {
            return this.rankedStudent.indexOf(student) === -1;
          });
        console.log(this.rankedStudent);
        this.dataSourceAlreadyRanked = new MatTableDataSource<User>(this.rankedStudent);
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    const prev = this.rankedStudent[event.previousIndex];
    this.rankedStudent[event.previousIndex] = this.rankedStudent[event.currentIndex];
    this.rankedStudent[event.currentIndex] = prev;
    this.universityService.updateRankingPosition(this.currentUniv._id, prev._id, event.currentIndex)
      .subscribe((res) => console.log(res));
  }
}
