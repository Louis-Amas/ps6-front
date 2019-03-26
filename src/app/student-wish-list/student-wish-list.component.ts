import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Wish} from '../../models/wish';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {StudentService} from '../../services/student/student.service';
import {Student} from '../../models/student';

@Component({
  selector: 'app-student-wish-list',
  templateUrl: './student-wish-list.component.html',
  styleUrls: ['./student-wish-list.component.css']
})
export class StudentWishListComponent implements OnInit {

  @Input()
    student: Student;

  wishes: Wish[] = [];

  constructor(public studentService: StudentService) {}

  ngOnInit() {
    this.wishes = this.student.wishList;
    console.log(this.wishes);
  }

  drop(event: CdkDragDrop<string[]>) {
    this.studentService.putWishPositionOfOneStudent(this.student.id, event.previousIndex + 1, event.currentIndex + 1);
    moveItemInArray(this.wishes, event.previousIndex, event.currentIndex);
  }
}
