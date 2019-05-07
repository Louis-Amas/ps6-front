import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../../models/user';
import {MatSort, MatTableDataSource} from '@angular/material';
import {StudentService} from '../../../../services/student/student.service';
import {University} from '../../../../models/university';
import {UniversityService} from '../../../../services/university/university.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Wish} from '../../../../models/wish';

@Component({
  selector: 'app-bri-overview',
  templateUrl: './bri-overview.component.html',
  styleUrls: ['./bri-overview.component.css']
})
export class BriOverviewComponent implements OnInit {

  @Input() bri: User;

  public universityForm: FormGroup;

  private universities: University[];
  private displayedColumns: ['note', 'year', 'schoolLevel', 'school'];
  private rankedStudents: User[];
  private unRankedStudents: User[];

  private currentUniv: University;

  constructor(private studentService: StudentService,
              private universityService: UniversityService,
              private formBuilder: FormBuilder) {
    this.universityForm = this.formBuilder.group({
      university: ['']
    });
  }

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.universityService
      .getUniversitiesObservable()
      .subscribe((universities) => this.universities = universities);
  }

  private resetList() {
    this.rankedStudents = [];
    this.unRankedStudents = [];
    this.currentUniv = undefined;
  }
  private getBestRank(user) {
      user.studentInfo.bestWishRank =
        user.studentInfo.wishes.reduce((acc, curr) => curr.rank < acc ? curr.rank : acc, 9999);
  }

  computeRanksForStudents() {
    this.rankedStudents.forEach(student => {
      student.studentInfo.wishes.forEach(wish => {
        wish.rank = this.currentUniv.rankings.map(user => user._id).indexOf(student._id);
      });
      this.rankedStudents.forEach(elem => this.getBestRank(elem));
    });
  }

  getUnrankedStudents() {
    this.studentService.getAllStudentsWithUniversityInWishes(this.currentUniv._id)
      .subscribe((users) => {
          this.unRankedStudents = users
            .filter(user => {
              for (let elem of this.rankedStudents) {
                if (user._id.toString() === elem._id.toString()) {
                  return false;
                }
              }
              return true;
            });
      });
  }

  chooseUniversity() {
    this.resetList();
    const univ = this.universityForm.getRawValue().university;
    this.currentUniv = univ;
    if (univ === '') { return; }
    this.universityService.getUniversityById(univ._id)
      .subscribe(univProcessed => {
        const rankings = univProcessed.rankings as any[];
        this.rankedStudents = rankings.map(ranks => ranks.studentId);
        this.currentUniv.rankings = this.rankedStudents;
        this.computeRanksForStudents();
        this.getUnrankedStudents();
      });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event.previousContainer === event.container, 'laldaldladl');
    if (event.previousContainer === event.container) {
      // rankedStudent => rankedStudent
      const prev = this.rankedStudents[event.previousIndex];
      this.rankedStudents[event.previousIndex] = this.rankedStudents[event.currentIndex];
      this.rankedStudents[event.currentIndex] = prev;
      this.universityService.updateRankingPosition(this.currentUniv._id, prev._id, event.currentIndex)
        .subscribe((res) => {
          this.currentUniv = res;
          const rankings = res.rankings as any[];
          this.rankedStudents = rankings.map(stud => stud.studentId) as User[];
          this.currentUniv.rankings = this.rankedStudents;
          this.computeRanksForStudents();
        });
    } else {
      // unRankedStudents => rankedStudent
      const user = this.unRankedStudents[event.previousIndex];
      transferArrayItem(this.unRankedStudents,
        this.rankedStudents,
        event.previousIndex,
        event.currentIndex);
      this.computeRanksForStudents();
      this.universityService.addStudentToRanking(this.currentUniv._id,
        user._id,
        event.currentIndex)
          .subscribe((res) => console.log(res));
    }
  }

  dropFromListUnRanked(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.unRankedStudents, event.previousIndex, event.currentIndex);
    } else {
      // ranked => unRankedStudent
      const user = this.rankedStudents[event.previousIndex];
      transferArrayItem(this.rankedStudents,
        this.unRankedStudents,
        event.previousIndex,
        event.currentIndex
      );
      this.computeRanksForStudents();
      this.universityService
        .deleteStudentFromRanking(this.currentUniv._id, user._id)
        .subscribe(res => console.log(res));
    }
  }
}
