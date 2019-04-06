import {Component, Input, OnInit} from '@angular/core';
import {Wish} from '../../../models/wish';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {StudentService} from '../../../services/student/student.service';
import {Student} from '../../../models/student';
import {MatDialog} from '@angular/material';
import {StudentOverviewDialogComponent} from '../student-overview-dialog/student-overview-dialog.component';

@Component({
  selector: 'app-student-wish-list',
  templateUrl: './student-wish-list.component.html',
  styleUrls: ['./student-wish-list.component.css']
})
export class StudentWishListComponent implements OnInit {

  @Input()
    student: Student;

  wishes: Wish[] = [];

  constructor(public studentService: StudentService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.studentService.getWishesOfOneStudent(this.student._id).subscribe( w => {
      this.wishes = w;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    const wishId = this.wishes.filter(x => {
      return x.position === (event.previousIndex + 1);
    })[0].id;

    this.studentService.putWishPositionOfOneStudent(this.student._id, wishId, event.currentIndex + 1);
    moveItemInArray(this.wishes, event.previousIndex, event.currentIndex);
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
      height: '400px',
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`); // Pizza!
    });

  }
}
