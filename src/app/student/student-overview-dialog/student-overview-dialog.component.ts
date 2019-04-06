import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-student-overview-dialog',
  templateUrl: './student-overview-dialog.component.html',
  styleUrls: ['./student-overview-dialog.component.css']
})
export class StudentOverviewDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StudentOverviewDialogComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
