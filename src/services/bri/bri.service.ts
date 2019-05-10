import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {Bri} from '../../models/bri';

@Injectable({
  providedIn: 'root'
})

export class BriService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private briUrl = 'http://127.0.0.1:9428/api/users';


  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  constructor(private http: HttpClient) {
  }

  getBriById(id: string): Observable<User> {
    return this.http.get<User>(this.briUrl + '/' + id);
  }

  addTimeSlot(userId: string, dateDep: Date, dateEnd: Date) {
    return this.http.post<User>(this.briUrl + '/bri/' + userId + '/timeSlot', {
      departureTime: dateDep,
      endTime: dateEnd
    });
  }

  filterStudent(id: string, filterStu: User[], idUniv: string, search: string, major: string) {
    if (idUniv !== undefined && search !== undefined && major !== undefined) {
      return filterStu.filter(stu => stu.studentInfo.wishes.find(wish =>
        wish.university._id === idUniv) &&
        (stu.lastName.toLowerCase().includes(search) || stu.firstName.toLowerCase().includes(search) ||
          stu.studentInfo.numStu.toString().includes(search)) && stu.studentInfo.major === major);
    } else {
      if (idUniv !== undefined && major !== undefined) {
        return filterStu.filter(stu => stu.studentInfo.wishes.find(wish =>
          wish.university._id === idUniv) && stu.studentInfo.major === major);
      } else {
        if (search !== undefined && idUniv !== undefined) {
          return filterStu.filter(stu => stu.firstName.toLowerCase().includes(search) || stu.lastName.toLowerCase().includes(search) ||
            stu.studentInfo.numStu.toString().includes(search) && stu.studentInfo.wishes.find(wish => wish.university._id === idUniv));
        } else {
          if (major !== undefined && search !== undefined) {
            return filterStu.filter(stu => stu.studentInfo.major === major &&
              stu.firstName.toLowerCase().includes(search) || stu.lastName.toLowerCase().includes(search) ||
              stu.studentInfo.numStu.toString().includes(search));
          } else {
            if (idUniv !== undefined) {
              return filterStu.filter(stu => stu.studentInfo.wishes.find(wish =>
                wish.university._id === idUniv));
            } else {
              if (search !== undefined) {
                return filterStu.filter(stu => stu.firstName.toLowerCase().includes(search) ||
                  stu.lastName.toLowerCase().includes(search) || stu.studentInfo.numStu.toString().includes(search));
              } else {
                if (major !== undefined) {
                  return filterStu.filter(stu => stu.studentInfo.major === major);
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

  findTimeSlotByDate(date: Date, bri: Bri) {
    return bri.appointment.filter(a => {
      const curDate = new Date(a.timeSlot.departureTime);
      if (curDate.getDate() === date.getDate() && curDate.getMonth() === date.getMonth()
          && curDate.getFullYear() === date.getFullYear()) {
        return true;
      }
    })[0];
  }
}
