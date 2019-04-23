import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-bri-file-in-process',
  templateUrl: './bri-file-in-process.component.html',
  styleUrls: ['./bri-file-in-process.component.css']
})
export class BriFileInProcessComponent implements OnInit {

  @Input() bri: User;

  constructor() { }

  ngOnInit() {
  }

}
