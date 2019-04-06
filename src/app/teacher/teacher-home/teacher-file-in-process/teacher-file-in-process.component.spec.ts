import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherFileInProcessComponent } from './teacher-file-in-process.component';

describe('TeacherFileInProcessComponent', () => {
  let component: TeacherFileInProcessComponent;
  let fixture: ComponentFixture<TeacherFileInProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherFileInProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherFileInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
