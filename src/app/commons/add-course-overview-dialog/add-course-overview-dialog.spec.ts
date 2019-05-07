import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseOverviewDialog } from './add-course-overview-dialog';

describe('AddCourseOverviewDialog', () => {
  let component: AddCourseOverviewDialog;
  let fixture: ComponentFixture<AddCourseOverviewDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseOverviewDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseOverviewDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
