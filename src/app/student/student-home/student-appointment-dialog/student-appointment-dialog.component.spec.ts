import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAppointmentDialogComponent } from './student-appointment-dialog.component';

describe('StudentAppointmentDialogComponent', () => {
  let component: StudentAppointmentDialogComponent;
  let fixture: ComponentFixture<StudentAppointmentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAppointmentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAppointmentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
