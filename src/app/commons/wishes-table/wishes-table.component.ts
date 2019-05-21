import {Component, Input, OnInit} from '@angular/core';
import {Note} from '../../../models/note';
import {Wish} from '../../../models/wish';

@Component({
  selector: 'app-wishes-table',
  templateUrl: './wishes-table.component.html',
  styleUrls: ['./wishes-table.component.css']
})
export class WishesTableComponent implements OnInit {

  @Input() wishes: [Wish];

  constructor() { }

  ngOnInit() {
  }

}
