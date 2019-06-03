import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {BriService} from '../../../../services/bri/bri.service';

@Component({
  selector: 'app-student-appointment-dialog',
  templateUrl: './student-appointment-dialog.component.html',
  styleUrls: ['./student-appointment-dialog.component.css']
})
export class StudentAppointmentDialogComponent implements OnInit {

  departureTime: Date;
  endTime: Date;
  briId: string;

  constructor(public dialogRef: MatDialogRef<StudentAppointmentDialogComponent>, private route: ActivatedRoute,
              private briService: BriService,
              @Inject(MAT_DIALOG_DATA) public data: {appointment: any, studentId: string}, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.departureTime = this.data.appointment.available.slot.departureTime;
    this.endTime = this.data.appointment.available.slot.endTime;
    this.briId = this.data.appointment.id;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  validateTimeSlot() {
    this.briService.studentReserveTimeSlot(this.briId, this.data.appointment.available._id, this.data.studentId).subscribe(student => {
      this.dialogRef.close(student);
      this.openSnackBar();
    });
  }

  openSnackBar() {
    this.snackBar.open( 'Vous avez pris un rendez-vous avec le BRI !', undefined, {
      duration: 4000,
    });
  }
}
