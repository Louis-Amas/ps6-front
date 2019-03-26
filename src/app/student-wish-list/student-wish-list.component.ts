import {Component, Input, OnInit} from '@angular/core';
import {Wish} from '../../models/wish';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-student-wish-list',
  templateUrl: './student-wish-list.component.html',
  styleUrls: ['./student-wish-list.component.css']
})
export class StudentWishListComponent implements OnInit {

  @Input()
  public wishes: Wish[] = [];

  constructor() { }

  ngOnInit() {
    console.log(this.wishes);
  }

  drop(event: CdkDragDrop<string[]>) {
    this.wishes.forEach(w => {
        if (w.position === (event.previousIndex + 1)) {
          w.position = event.currentIndex + 1;
        } else if (w.position === (event.currentIndex + 1)) {
          w.position = event.previousIndex + 1;
        }
      }
    );
    moveItemInArray(this.wishes, event.previousIndex, event.currentIndex);
  }
}
