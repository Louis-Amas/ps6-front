import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UniversityService} from '../../../../services/university/university.service';
import {User} from '../../../../models/user';
import {University} from '../../../../models/university';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAJOR_MOCKED} from '../../../../mocks/speciality.mocks';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent implements OnInit {

  @Input() teacher: User;

  @Output()
  universityEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  nameEvent: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  majorEvent: EventEmitter<string> = new EventEmitter<string>();

  SPE_LIST: any[];

  universities: University[] = [];
  nameValue: string;

  public filterForm: FormGroup;

  constructor(public formBuilder: FormBuilder, public universityService: UniversityService) {
    this.filterForm = this.formBuilder.group({
      search: [''],
    });
  }

  ngOnInit() {
    this.getUniversity();
    this.SPE_LIST = MAJOR_MOCKED.filter(m => m.major === this.teacher.teacherInfo.responsible)[0].specialty;
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
    if (name === '') {
      this.nameEvent.emit('undefined');
    } else {
      this.nameEvent.emit(name.toString());
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

  getUniversity() {
    this.universityService.getByMajor(this.teacher.teacherInfo.responsible).subscribe(univ => {
      this.universities = univ;
    }
    );
  }
}
