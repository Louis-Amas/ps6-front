import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-back-header',
  templateUrl: './back-header.component.html',
  styleUrls: ['./back-header.component.css']
})
export class BackHeaderComponent implements OnInit {

  @Input() backNumber: number;

  constructor() { }

  ngOnInit() {
  }
}
