import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BriAppointmentCreationDialogComponent } from './bri-appointment-creation-dialog.component';

describe('BriAppointmentCreationDialogComponent', () => {
  let component: BriAppointmentCreationDialogComponent;
  let fixture: ComponentFixture<BriAppointmentCreationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BriAppointmentCreationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriAppointmentCreationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
