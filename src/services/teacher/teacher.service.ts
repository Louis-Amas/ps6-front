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

  filterStudent(id: string, filterStu: User[], idUniv: string, search: string, major: string) {
    if (idUniv !== undefined && search !== undefined && major !== undefined) {
      return filterStu.filter(stu => stu.studentInfo.wishes.find(wish =>
        wish.university._id === idUniv) && (stu.lastName.toLowerCase().includes(search) ||
        stu.firstName.toLowerCase().includes(search) || stu.studentInfo.numStu.toString().includes(search))
        && stu.studentInfo.lastYearMajor === major);
    } else {
        if (idUniv !== undefined && search !== undefined) {
          return filterStu.filter(stu => stu.studentInfo.wishes.find(wish =>
            wish.university._id === idUniv) && stu.firstName.toLowerCase().includes(search) || stu.lastName.toLowerCase().includes(search)
            || stu.studentInfo.numStu.toString().includes(search));
        } else {
          if (search !== undefined && major !== undefined) {
            return filterStu.filter(stu => stu.firstName.toLowerCase().includes(search) || stu.lastName.toLowerCase().includes(search)
              || stu.studentInfo.numStu.toString().includes(search) && stu.studentInfo.lastYearMajor === major);
          } else {
            if (idUniv !== undefined && major !== undefined) {
              return filterStu.filter(stu => stu.studentInfo.wishes.find(wish =>
                wish.university._id === idUniv) && stu.studentInfo.lastYearMajor === major);
            } else {
              if (idUniv !== undefined) {
                return filterStu.filter(stu => stu.studentInfo.wishes.find(wish =>
                  wish.university._id === idUniv));
              } else {
                if (major !== undefined) {
                  return filterStu.filter(stu => stu.studentInfo.lastYearMajor === major);
                } else {
                  if (search !== undefined) {
                    return filterStu.filter(stu => stu.firstName.toLowerCase().includes(search) ||
                      stu.lastName.toLowerCase().includes(search)
                      || stu.studentInfo.numStu.toString().includes(search));
                  } else {
                    return filterStu;
                  }
                }
              }
            }
        }
      }
    }

  }
}
