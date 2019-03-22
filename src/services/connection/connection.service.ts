import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ConnectionService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  public isConnected: boolean;
  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public connection$: BehaviorSubject<boolean> = new BehaviorSubject(this.isConnected);

  constructor(private http: HttpClient) {
    this.isConnected = false;
    this.connection$.next(this.isConnected);
  }

  updateConnection() {
    if (!this.isConnected) {
      this.isConnected = true;
    } else {
      this.isConnected = false;
    }
    this.connection$.next(this.isConnected);
  }
}
