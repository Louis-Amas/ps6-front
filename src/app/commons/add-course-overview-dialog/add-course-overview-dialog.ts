import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {UniversityService} from '../../../services/university/university.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-teacher-overview-dialog',
  templateUrl: './add-course-overview-dialog.html',
  styleUrls: ['./add-course-overview-dialog.css']
})
export class AddCourseOverviewDialogComponent implements OnInit {

  public courseForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<AddCourseOverviewDialogComponent>, private route: ActivatedRoute,
              private universityService: UniversityService,
              @Inject(MAT_DIALOG_DATA) public data: any, public formBuilder: FormBuilder) {

    this.courseForm = this.formBuilder.group({
      name: [''],
      ECTS: [''],
      semester: [''],
      link: [''],
      comment: [''],
    });
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addCourse() {
    const semester = this.courseForm.get('semester').value;
    const name = this.courseForm.get('name').value;
    const ECTS = this.courseForm.get('ECTS').value;
    const link = this.courseForm.get('link').value;
    const description = this.courseForm.get('comment').value;
    this.universityService.addCourse(this.data.univ._id, name, semester, link, ECTS, this.data.user,
      description).subscribe( univ => {
        this.data.univ = univ;
        this.dialogRef.close(this.data.univ);
      }
    );
  }


}
