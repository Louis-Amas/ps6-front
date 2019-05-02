import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../../../models/user';
import {University} from '../../../../models/university';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UniversityService} from '../../../../services/university/university.service';

@Component({
  selector: 'app-filter-bar-bri',
  templateUrl: './filter-bar-bri.component.html',
  styleUrls: ['./filter-bar-bri.component.css']
})
export class FilterBarBriComponent implements OnInit {

  @Input() bri: User;

  @Output()
  universityEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  nameEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  majorEvent: EventEmitter<string> = new EventEmitter<string>();

  universities: University[] = [];
  nameValue: string;

  public filterForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public universityService: UniversityService) {
    this.filterForm = this.formBuilder.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.getUniversities();
  }

  onUniversitySelected($event) {
    const country = $event.value;
    if (country !== undefined) {
      this.universityEvent.emit(country.toString());
    } else {
      this.universityEvent.emit(undefined);
    }
  }

  onNameSelected($event) {
    const name = $event.target.value;
    if (name !== undefined) {
      this.nameEvent.emit(name.toString());
    } else {
      this.nameEvent.emit(undefined);
    }
  }

  onMajorSelected($event) {
    const major = $event.value;
    if (major !== undefined) {
      this.majorEvent.emit(major.toString());
    } else {
      this.majorEvent.emit(undefined);
    }
  }

  getUniversities() {
    this.universityService.getUniversitiesObservable().subscribe(univ =>
        this.universities = univ);
  }

}
