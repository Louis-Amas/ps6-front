import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherUniversityDetailsComponent } from './teacher-university-details.component';

describe('TeacherUniversityDetailsComponent', () => {
  let component: TeacherUniversityDetailsComponent;
  let fixture: ComponentFixture<TeacherUniversityDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherUniversityDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherUniversityDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
