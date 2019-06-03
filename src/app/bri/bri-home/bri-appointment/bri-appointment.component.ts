import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {DateAdapter, MatDatepickerInputEvent, MatDialog, MatTableDataSource} from '@angular/material';
import {BriService} from '../../../../services/bri/bri.service';
import {BriAppointmentCreationDialogComponent} from '../bri-appointment-creation-dialog/bri-appointment-creation-dialog.component';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-bri-appointment',
  templateUrl: './bri-appointment.component.html',
  styleUrls: ['./bri-appointment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BriAppointmentComponent implements OnInit {

  @Input() bri: User;

  private displayedColumns: string[] = ['firstName', 'lastName', 'major', 'timeSlot', 'details'];
  private drawTable: boolean;
  dataSource = new MatTableDataSource();

  constructor(private briService: BriService, public dialog: MatDialog, private adapter: DateAdapter<any>) {
  }

  ngOnInit() {
    this.drawTable = false;
    this.adapter.setLocale('fr');
  }

  dateUsed = (d: Date) => {
    return this.myFilter(d) ? 'appointment' : undefined;
  }

  myFilter = (d: Date): boolean => {
    let res = false;
    this.bri.briInfo.appointment.forEach(t => {
      const curDate = new Date(t.timeSlot.departureTime);
      if (d.getMonth() === curDate.getMonth() && d.getDate() === curDate.getDate()) {
        res = true;
      }
    });
    return res;
  }

  getDateChoose(event: MatDatepickerInputEvent<Date>) {
    const appointment = this.briService.findTimeSlotByDate(event.value, this.bri.briInfo);
    if (appointment !== undefined) {
      const available = appointment.available;
      // convert to date
      available.map(a => {
        a.slot.departureTime = new Date(a.slot.departureTime);
        a.slot.endTime = new Date(a.slot.endTime);
      });
      this.dataSource = new MatTableDataSource<any>(available);
      this.drawTable = true;
    } else {
      this.drawTable = false;
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(BriAppointmentCreationDialogComponent, {
      height: '430px',
      width: '700px',
      data: this.bri
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.bri = result;
      }
    });
  }

  getAppointmentOfTheDay() {
    const time = new Date();
    const appointment = this.briService.findTimeSlotByDate(time, this.bri.briInfo);
    if (appointment !== undefined) {
      const available = appointment.available;
      // convert to date
      available.map(a => {
        a.slot.departureTime = new Date(a.slot.departureTime);
        a.slot.endTime = new Date(a.slot.endTime);
      });
      return available.filter(a => a.reservedBy !== undefined);
    }
  }
}
