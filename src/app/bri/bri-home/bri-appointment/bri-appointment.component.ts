import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Bri} from '../../../../models/bri';
import {MatDatepickerInputEvent, MatTableDataSource} from '@angular/material';
import {BriService} from '../../../../services/bri/bri.service';

@Component({
  selector: 'app-bri-appointment',
  templateUrl: './bri-appointment.component.html',
  styleUrls: ['./bri-appointment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BriAppointmentComponent implements OnInit {

  @Input() bri: Bri;

  private displayedColumns: string[] = ['firstName', 'lastName', 'major', 'timeSlot', 'details'];
  private drawTable: boolean;
  dataSource = new MatTableDataSource();

  constructor(private briService: BriService) { }

  ngOnInit() {
    this.drawTable = false;
  }

  dateUsed = (d: Date) => {
    let res = false;
    this.bri.appointment.forEach( t => {
      const curDate = new Date(t.timeSlot.departureTime);
      if (d.getMonth() === curDate.getMonth() && d.getDate() === curDate.getDate()) {
        res = true;
      }
    });
    return res ? 'appointment' : undefined;
  }

  getDateChoose(event: MatDatepickerInputEvent<Date>) {
      const appointment = this.briService.findTimeSlotByDate(event.value, this.bri);
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
}
