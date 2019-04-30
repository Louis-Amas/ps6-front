import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Wish} from '../../../models/wish';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {StudentService} from '../../../services/student/student.service';
import {MatDialog} from '@angular/material';
import {StudentOverviewDialogComponent} from '../student-overview-dialog/student-overview-dialog.component';
import {User} from '../../../models/user';

@Component({
  selector: 'app-student-wish-list',
  templateUrl: './student-wish-list.component.html',
  styleUrls: ['./student-wish-list.component.css']
})
export class StudentWishListComponent implements OnInit {

  @Input()
    student: User;

  @Output()
    studentOut: EventEmitter<User> = new EventEmitter<User>();
  wishes: Wish[] = [];
  msg: string;
  sendMsg: boolean;

  constructor(public studentService: StudentService, public dialog: MatDialog) {
    this.sendMsg = false;
  }

  ngOnInit() {
    this.studentService.getWishesOfOneStudent(this.student._id).subscribe( w => {
      this.wishes = w;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.student.studentInfo.stateValidation === 'waitStudent') {
      this.sendMsg = false;
      const univId = this.wishes.filter(x => {
        return x.position === (event.previousIndex + 1);
      })[0].university._id;

      this.studentService.putWishPositionOfOneStudent(this.student._id, univId, event.currentIndex + 1).
      subscribe( wishes => {
        this.wishes = wishes;
      });
      moveItemInArray(this.wishes, event.previousIndex, event.currentIndex);
    } else {
      this.msg = 'Vous avez transmit vos voeux, vous ne pouvez plus les modifier';
      this.sendMsg = true;
    }
  }

  getCourseOfWish(wish: Wish) {
    const idCourses = wish.courses;
    return  wish.university.courses.filter( course => {
      if (course !== undefined) {
        if (idCourses.find(x => x === course._id)) {
          return course;
        }
      }
    });
  }

  deleteWish(wish: Wish) {
    this.studentService.deleteWishOfOneStudent(this.student._id, wish.university._id).subscribe(wishes => {
      this.wishes = wishes;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(StudentOverviewDialogComponent, {
      height: '370px',
      width: '800px',
      data: this.student._id,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.student = result;
        this.studentOut.emit(this.student);
      }
    });

  }
}
