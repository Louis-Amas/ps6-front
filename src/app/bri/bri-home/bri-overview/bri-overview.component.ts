import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-bri-overview',
  templateUrl: './bri-overview.component.html',
  styleUrls: ['./bri-overview.component.css']
})
export class BriOverviewComponent implements OnInit {

  @Input() bri: User;

  constructor() { }

  ngOnInit() {
  }

}
