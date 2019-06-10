import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TeacherService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private teacherUrl = 'http://127.0.0.1:9428/api/users';


  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  constructor(private http: HttpClient) {
  }

  getTeacherById(id: string): Observable<User> {
    return this.http.get<User>(this.teacherUrl + '/' + id);
  }

  filterStudent(id: string, filterStu: User[], idUniv: string, search: string, major: string) {
    let res = filterStu;
    if (idUniv !== undefined) {
      res = res.filter(s => {
        if (s.studentInfo.wishes.filter(u => u.university._id === idUniv).length > 0) {
          return true;
        }
      });
    }
    if (search !== undefined) {
      res = res.filter(s => {
        return s.firstName.toLowerCase().includes(search) || s.lastName.toLocaleLowerCase().includes(search);
      });
    }
    if (major !== undefined) {
      res = res.filter(s => {
        return s.studentInfo.lastYearMajor === major;
      });
    }
    return res;
  }







}
