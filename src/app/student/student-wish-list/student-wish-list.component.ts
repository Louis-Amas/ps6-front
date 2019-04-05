import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Wish} from '../../../models/wish';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {StudentService} from '../../../services/student/student.service';
import {Student} from '../../../models/student';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-student-wish-list',
  templateUrl: './student-wish-list.component.html',
  styleUrls: ['./student-wish-list.component.css']
})
export class StudentWishListComponent implements OnInit {

  @Input()
    student: Student;

  wishes: Wish[] = [];

  constructor(public studentService: StudentService) {
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
    return wish.university.courses.reduce( course => {
      if (course !== undefined) {
        if (idCourses.find(x => x == course._id)) {
          return course;
        }
      }
    });
  }
}
