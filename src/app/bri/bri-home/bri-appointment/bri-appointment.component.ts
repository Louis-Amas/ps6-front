import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {DateAdapter, MatDatepickerInputEvent, MatDialog, MatTableDataSource} from '@angular/material';
import {BriService} from '../../../../services/bri/bri.service';
import {BriAppointmentCreationDialogComponent} from '../bri-appointment-creation-dialog/bri-appointment-creation-dialog.component';
import {User} from '../../../../models/user';
import {IMqttMessage, MqttService} from 'ngx-mqtt';
import {ResultOfAccept} from '../../../../models/resultOfAccept';
import {OrchestatorService} from '../../../../services/ochestrator.service';

enum StateAppointement {
  NoBody,
  Someone
}



@Component({
  selector: 'app-bri-appointment',
  templateUrl: './bri-appointment.component.html',
  styleUrls: ['./bri-appointment.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class BriAppointmentComponent implements OnInit, OnDestroy {

  public message: string;


  @Input() bri: User;

  private displayedColumns: string[] = ['firstName', 'lastName', 'major', 'timeSlot', 'details'];
  private drawTable: boolean;
  dataSource = new MatTableDataSource();

  appointmentOfTheDay: any[] = [];

  statusOfAppointement: StateAppointement;

  constructor(private briService: BriService, public dialog: MatDialog,
              private adapter: DateAdapter<any>, private mqttService: MqttService,
              private orchestator: OrchestatorService) {

    this.statusOfAppointement = StateAppointement.NoBody;
    // Button clické
    this.mqttService.observe('/rasp/button').subscribe((message: IMqttMessage) => {
      this.message = message.payload.toString();
      // Si il y a personne et que l'on click
      if (this.statusOfAppointement === StateAppointement.NoBody) {
       this.briService.acceptWaitingStudents(this.bri._id, 'waiting', 'inProcess')
         .subscribe((result: ResultOfAccept) => {
           // si on a trouvé qq1
              if (result.result) {
                this.statusOfAppointement = StateAppointement.Someone;
                this.orchestator.stopBlinking();
                this.orchestator.ledOn();
                this.updateStatusOfStudent(result, 'inProcess');
              }
         });
      } else {
        this.briService.acceptWaitingStudents(this.bri._id, 'inProcess', 'done')
          .subscribe((result: ResultOfAccept) => {
              this.statusOfAppointement = StateAppointement.NoBody;
              this.orchestator.ledOff();
              this.briService.getDelay(this.bri._id).subscribe(x => {
                this.orchestator.display4DigitNumber(x.delay);
              });
              this.updateStatusOfStudent(result, 'done');
              this.appointmentOfTheDay.forEach(a => {
                if (a.reservedBy.status === 'waiting') {
                  this.orchestator.startBlinking();
                }
              });
          });
      }
    });

    this.orchestator.observeIonicApp()
      .subscribe((message) => {
        const res = {
          studentId: message.payload.toString()
        } as ResultOfAccept;
        this.updateStatusOfStudent(res, 'waiting');
        if (this.statusOfAppointement === StateAppointement.NoBody) {
          this.orchestator.startBlinking();
          this.briService.getDelay(this.bri._id).subscribe(x => {
            this.orchestator.display4DigitNumber(x.delay);
          });
        }
      });
  }

  colorByStatus = {
    none: '#FFFFFF',
    waiting: '#98FB98',
    inProcess: '#00aeef',
    done: '#C0C0C0'
  };

  ngOnInit() {
    this.drawTable = false;
    this.adapter.setLocale('fr');
    this.getAppointmentOfTheDay();
    this.briService.getDelay(this.bri._id).subscribe(x => {
      this.orchestator.display4DigitNumber(x.delay);
    });
  }

  ngOnDestroy() {
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
      const available = [];
      appointment.forEach(a => {
        a.available.forEach(av => available.push((av)));
      });
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
    this.briService.getAppointmentOfTheDay(this.bri._id).subscribe(appointment => {
      if (appointment !== undefined) {
        const available = [];
        appointment.forEach(a => {
          a.available.forEach(av => available.push((av)));
        });
        // convert to date
        available.map(a => {
          a.slot.departureTime = new Date(a.slot.departureTime);
          a.slot.endTime = new Date(a.slot.endTime);
        });
        this.appointmentOfTheDay = available.filter(a => a.reservedBy !== undefined);
      }
    });
  }


  updateStatusOfStudent(result: ResultOfAccept, newStatus: string) {
    this.appointmentOfTheDay.forEach((appointemnt: any) => {
      if (appointemnt.reservedBy._id === result.studentId) {
        appointemnt.reservedBy.studentInfo.appointment.status = newStatus;
        return;
      }
    });
  }
}
