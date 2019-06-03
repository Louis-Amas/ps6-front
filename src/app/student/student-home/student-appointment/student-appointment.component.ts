import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {BriService} from '../../../../services/bri/bri.service';
import {User} from '../../../../models/user';
import {
  DateAdapter,
  MatDatepickerInputEvent,
  MatDialog,
  MatTableDataSource
} from '@angular/material';
import {StudentAppointmentDialogComponent} from '../student-appointment-dialog/student-appointment-dialog.component';
import {TimeSlot} from '../../../../models/timeSlot';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-student-appointment',
  templateUrl: './student-appointment.component.html',
  styleUrls: ['./student-appointment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class StudentAppointmentComponent implements OnInit {

  @Input() student: User;

  appointments: User[];
  drawTable: boolean;
  timeSlot: TimeSlot;
  options: FormGroup;

  private displayedColumns: string[] = ['timeSlot', 'bri', 'choose'];
  dataSource = new MatTableDataSource();

  constructor(public briService: BriService, public dialog: MatDialog, private adapter: DateAdapter<any>, fb: FormBuilder) {
    this.options = fb.group({
      bri: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.drawTable = false;
    this.adapter.setLocale('fr');
    if (this.student.studentInfo.appointment !== undefined) {
      this.timeSlot = this.student.studentInfo.appointment.timeSlot;
      this.initTimeSlot();
    }
    this.briService.getAllAppointment().subscribe(a => {
        this.appointments = a;
    });
  }

  dateUsed = (d: Date) => {
    let res = false;
    this.appointments.forEach(user => user.briInfo.appointment.forEach( t => {
      const curDate = new Date(t.timeSlot.departureTime);
      if (d.getMonth() === curDate.getMonth() && d.getDate() === curDate.getDate()) {
        res = true;
      }
    }));
    return res ? 'appointment' : undefined;
  }

  getDateChoose(event: MatDatepickerInputEvent<Date>) {
    const available = [];
    this.appointments.forEach(bri => {
      const appointment = this.briService.findTimeSlotByDate(event.value, bri.briInfo);
      if (appointment !== undefined) {
        appointment.available.map(a => {
          a.slot.departureTime = new Date(a.slot.departureTime);
          a.slot.endTime = new Date(a.slot.endTime);
        });
        available.push({available: appointment.available, bri: {firstName: bri.firstName, lastName: bri.lastName, id: bri._id}});
    }});
    const res = this.briService.createOneHourTimeSlot(available);
    if (res.length >= 1) {
      this.dataSource = new MatTableDataSource<any>(res);
      this.drawTable = true;
    } else {
      this.drawTable = false;
    }
  }

  openDialog(timeSlot: any) {
    const dialogRef = this.dialog.open(StudentAppointmentDialogComponent, {
      height: '280px',
      width: '800px',
      data: {appointment: timeSlot, studentId: this.student._id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.student = result;
        this.timeSlot = this.student.studentInfo.appointment.timeSlot;
        this.initTimeSlot();
      }
    });
  }

  private initTimeSlot() {
    this.timeSlot.departureTime = new Date(this.timeSlot.departureTime);
    this.timeSlot.endTime = new Date(this.timeSlot.endTime);
  }
}
