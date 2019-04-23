import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../models/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Wish} from '../../../models/wish';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-wish-overview-dialog',
  templateUrl: './wish-overview-dialog.component.html',
  styleUrls: ['./wish-overview-dialog.component.css']
})
export class WishOverviewDialogComponent implements OnInit {

  public messageForm: FormGroup;
  private wishSelected: Wish[];

  constructor(public dialogRef: MatDialogRef<WishOverviewDialogComponent>, private route: ActivatedRoute,
              private userService: UserService, public formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: {
                student: User,
                teacher: User
              }) {
    this.messageForm = this.formBuilder.group({
      contents: ['']
    });
  }

  ngOnInit() {
    this.wishSelected = [];
  }

  updateWishSelected(event) {
    if (this.wishSelected.indexOf(event.option.value) !== -1) {
      this.wishSelected.splice(this.wishSelected.indexOf(event.option.value));
    } else {
      this.wishSelected.push(event.option.value);
    }
  }

  refuseFile() {
    let message = '';
    if (this.wishSelected.length > 0) {
      message = 'Il y a un problème dans le(s) voeu(x) suivants: \n';
      this.wishSelected.forEach(wish => {
        message = message + '\t- Voeu n°' + wish.position + ' : ' + wish.university.name + '\n';
      });
      message = message + this.messageForm.value.contents;
    } else {
      message = this.messageForm.value.contents;
    }
    this.postMessage(message);
  }

  back() {
    this.dialogRef.close();
  }

  postMessage(message: string) {
    this.userService.postMessage(this.data.teacher._id, this.data.student._id, message).subscribe( teacher => {
      this.dialogRef.close(teacher);
    });
  }
}
