import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Student} from '../../models/student';
import {Wish} from "../../models/wish";

@Injectable({
  providedIn: 'root'
})

export class TeacherService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private teacherUrl = 'http://127.0.0.1:9428/api/users';
  private teacherUrl2 = 'http://127.0.0.1:9428/api/users/teacher';
  public studentList: User[] = [];


  public students$: BehaviorSubject<User[]> = new BehaviorSubject(this.studentList);

  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  constructor(private http: HttpClient) {
  }

  getTeacherById(id: string): Observable<User> {
    return this.http.get<User>(this.teacherUrl + '/' + id);
  }

  getConcernedStudent(id: string) {
    return this.http.get<User[]>(this.teacherUrl2 + '/' + id + '/students');
  }

  filterStudent(id: string, idUniv: string, filterStu: User[]) {
    return filterStu.filter(stu => stu.studentInfo.wishes.find( wish =>
    wish.university === idUniv));
  }
}
