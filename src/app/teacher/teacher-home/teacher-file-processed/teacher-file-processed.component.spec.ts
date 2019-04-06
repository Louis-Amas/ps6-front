import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFileProcessedComponent } from './teacher-file-processed.component';

describe('TeacherFileProcessedComponent', () => {
  let component: TeacherFileProcessedComponent;
  let fixture: ComponentFixture<TeacherFileProcessedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFileProcessedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFileProcessedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
