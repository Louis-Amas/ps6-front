import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BriService} from '../../../../services/bri/bri.service';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-bri-appointment-creation-dialog',
  templateUrl: './bri-appointment-creation-dialog.component.html',
  styleUrls: ['./bri-appointment-creation-dialog.component.css']
})
export class BriAppointmentCreationDialogComponent implements OnInit {

  public dateSelected: boolean;
  private date: Date;
  public dateForm: FormGroup;
  public hour: number[];
  public min: number[];

  constructor(public dialogRef: MatDialogRef<BriAppointmentCreationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public bri: User, public formBuilder: FormBuilder, public briService: BriService,
              public snackBar: MatSnackBar) {
    this.dateForm = this.formBuilder.group({
      hourDep: 15,
      minDep: 0,
      hourEnd: 17,
      minEnd: 0,
    });
  }

  ngOnInit() {
    this.dateSelected = false;
    this.hour = [];
    this.min = [];
    for (let i = 7; i < 20; i++) {
      this.hour.push(i);
    }
    for (let i = 0; i < 60; i += 15) {
      this.min.push(i);
    }
  }

  myFilter = (d: Date): boolean => {
    const day = d.getDay();
    const date = new Date();
    date.setSeconds(0);
    date.setHours(0);
    date.setMinutes(0);

    return day !== 0 && (d.getTime() + 1000) > date.getTime();
  }

  back() {
    this.dialogRef.close();
  }

  createTimeSlot() {
    const dateDep = new Date(this.date);
    const dateEnd = new Date(this.date);

    dateDep.setHours(this.dateForm.value.hourDep);
    dateDep.setMinutes(this.dateForm.value.minDep);

    dateEnd.setHours(this.dateForm.value.hourEnd);
    dateEnd.setMinutes(this.dateForm.value.minEnd);

    this.briService.addTimeSlot(this.bri._id, dateDep, dateEnd).subscribe( bri => {
      this.dialogRef.close(bri);
      this.openSnackBar();
    });
  }

  onDateSelected(event) {
    this.date = event.value;
    this.dateSelected = true;
  }

  openSnackBar() {
    this.snackBar.open( 'Vous avez ajouté un nouveau créneau !', undefined, {
      duration: 4000,
    });
  }
}
