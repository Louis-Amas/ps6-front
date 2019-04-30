import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-bri-appointment',
  templateUrl: './bri-appointment.component.html',
  styleUrls: ['./bri-appointment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BriAppointmentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dateUsed(d: Date) {
    const date = d.getDate();
    return (date === 1 || date === 20) ? 'appointment' : undefined;
  }
}
