import {Component, Input, OnInit, Output} from '@angular/core';
import {ConnectionService} from '../../services/connection/connection.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private connected;

  constructor(public connection: ConnectionService) {
    console.log(this.connected);
    this.connection.connection$.subscribe(c => this.connected = c);
    console.log(this.connected);
  }

  ngOnInit() {
  }

  disconnection() {
    this.connection.disconnect();
  }
}
