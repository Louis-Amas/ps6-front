import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {BriService} from '../../../services/bri/bri.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-bri-home',
  templateUrl: './bri-home.component.html',
  styleUrls: ['./bri-home.component.css']
})
export class BriHomeComponent implements OnInit {

  public bri: User;

  constructor(private route: ActivatedRoute, public briService: BriService, ) { }

  ngOnInit() {
    this.getBri();
  }

  getBri() {
    const id = this.route.snapshot.paramMap.get('id');
    this.briService.getBriById(id).subscribe(b => {
        this.bri = b;
      }
    );
  }

}
