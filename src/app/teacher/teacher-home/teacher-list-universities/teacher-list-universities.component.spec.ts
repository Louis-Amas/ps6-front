import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherListUniversitiesComponent } from './teacher-list-universities.component';

describe('TeacherListUniversitiesComponent', () => {
  let component: TeacherListUniversitiesComponent;
  let fixture: ComponentFixture<TeacherListUniversitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherListUniversitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherListUniversitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
