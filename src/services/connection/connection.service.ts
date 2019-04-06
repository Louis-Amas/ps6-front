import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../../models/user';


@Injectable({
  providedIn: 'root'
})

export class ConnectionService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private url = 'http://127.0.0.1:9428/api/auth';
  public isConnected: boolean;
  public user: User;
  public isStudent: boolean;
  public isTeacher: boolean;
  public isBRI: boolean;
  public isError: boolean;

  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public connection$: BehaviorSubject<boolean> = new BehaviorSubject(this.isConnected);

  constructor(private http: HttpClient) {
    this.isConnected = false;
    this.isBRI = false;
    this.isStudent = false;
    this.isTeacher = false;
    this.isError = false;
    this.connection$.next(this.isConnected);
  }

  connectWithCredientials(email: string, password: string) {
    this.isStudent = false;
    this.isTeacher = false;
    this.isBRI = false;
    const credientials = `${email}:${password}`;
    localStorage.setItem('token', credientials);
    this.http.get<User>(this.url)
      .subscribe(res => {
        switch (res.role) {
          case 'student':
            this.isStudent = true;
            break;
          case 'teacher':
            this.isTeacher = true;
            break;
        }
        this.user = res;
        this.isConnected = true;
        this.isError = false;
        this.connection$.next(this.isConnected);
      }, err => {
        this.isConnected = false;
        this.isError = true;
        this.connection$.next(this.isConnected);
      });
  }

  disconnect() {
    this.isConnected = !this.isConnected;
    this.connection$.next(this.isConnected);
    localStorage.removeItem('token');
  }
}
