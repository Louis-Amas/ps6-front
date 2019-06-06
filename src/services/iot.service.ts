import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class IotService {

  private orchestratorUrl = 'http://localhost:1880';

  constructor(private http: HttpClient) {
  }

  changeLedState(state: boolean) {
    let res = 0;
    if (state) {
      res = 1;
    }
    return this.http.post<any>(this.orchestratorUrl + '/led', {res});
  }
}

