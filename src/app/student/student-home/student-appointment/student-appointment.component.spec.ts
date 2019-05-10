import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAppointmentComponent } from './student-appointment.component';

describe('StudentAppointmentComponent', () => {
  let component: StudentAppointmentComponent;
  let fixture: ComponentFixture<StudentAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
