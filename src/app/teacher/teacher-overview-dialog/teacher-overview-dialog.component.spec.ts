import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherOverviewDialogComponent } from './teacher-overview-dialog.component';

describe('TeacherOverviewDialogComponent', () => {
  let component: TeacherOverviewDialogComponent;
  let fixture: ComponentFixture<TeacherOverviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherOverviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
