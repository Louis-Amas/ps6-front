import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentOverviewDialogComponent } from './student-overview-dialog.component';

describe('StudentOverviewDialogComponent', () => {
  let component: StudentOverviewDialogComponent;
  let fixture: ComponentFixture<StudentOverviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentOverviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentOverviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
