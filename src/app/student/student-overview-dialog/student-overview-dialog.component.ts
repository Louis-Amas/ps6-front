import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../../services/student/student.service';

@Component({
  selector: 'app-student-overview-dialog',
  templateUrl: './student-overview-dialog.component.html',
  styleUrls: ['./student-overview-dialog.component.css']
})
export class StudentOverviewDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<StudentOverviewDialogComponent>, private route: ActivatedRoute,
              private studentService: StudentService,
              @Inject(MAT_DIALOG_DATA) public studentId: string) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateStudentState() {
    this.studentService.updateStudentState(this.studentId, 'waitTeacher').subscribe(stu => {
      this.dialogRef.close(stu);
    });

  }
}
