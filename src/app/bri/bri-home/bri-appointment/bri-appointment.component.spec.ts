import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriAppointmentComponent } from './bri-appointment.component';

describe('BriAppointmentComponent', () => {
  let component: BriAppointmentComponent;
  let fixture: ComponentFixture<BriAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
