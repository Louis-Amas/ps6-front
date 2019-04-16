import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UniversityService} from '../../../../services/university/university.service';
import {User} from '../../../../models/user';
import {University} from '../../../../models/university';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Input() teacher: User;

  @Output()
  universityEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  universities: University[] = [];

  constructor(public universityService: UniversityService) { }

  ngOnInit() {
    this.getUniversity();
  }

  onUniversitySelected($event) {
    const country = $event.value;
    this.universityEvent.emit(country.toString());
  }

  getUniversity() {
    this.universityService.getByMajor(this.teacher.teacherInfo.responsible).subscribe(univ => {
      this.universities = univ;
    }
    );
  }
}
