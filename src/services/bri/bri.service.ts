import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {Observable} from 'rxjs';
import {Bri} from '../../models/bri';
import {ResultOfAccept} from '../../models/resultOfAccept';

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

  getAllAppointment() {
    return this.http.get<User[]>(this.briUrl + '/bri/appointment');
  }

  acceptWaitingStudents(id: string, lastStatus: string, newStatus: string) {
    return this.http.put<ResultOfAccept>(this.briUrl + `/bri/${id}/appointment/${new Date()}/accept`, {
      lastStatus,
      newStatus
    });
  }

  getAppointmentOfTheDay(id: string): Observable<any[]> {
    const date = new Date();
    return this.http.get<any[]>(this.briUrl + '/bri/' + id + '/appointment/' + date.toISOString() );
  }

  studentReserveTimeSlot(briId: string, timeSlotId: string, studentId: string) {
    return this.http.put<User>(this.briUrl + '/bri/' + briId + '/appointment/available/' + timeSlotId, {
      reservedBy: studentId
    });
  }

  getDelay(briId: string) {
    return this.http.get<any>(this.briUrl + '/bri/' + briId + '/appointment/delay');
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
        return s.studentInfo.major === major;
      });
    }
    return res;
  }

  findTimeSlotByDate(date: Date, bri: Bri) {
    return bri.appointment.filter(a => {
      const curDate = new Date(a.timeSlot.departureTime);
      if (curDate.getDate() === date.getDate() && curDate.getMonth() === date.getMonth()
          && curDate.getFullYear() === date.getFullYear()) {
        return true;
      }
    });
  }

  createOneHourTimeSlot(appointment: any[]) {
    const res = [];
    appointment.forEach( a => {
      const avFree = a.available.filter(x => x.reservedBy === undefined);
      if (avFree.length >= 0) {
        let hour = avFree[0].slot.departureTime.getHours();
        let bo = res.filter(r => r.hourDep === hour);
        if (bo[0] !== undefined) {
          bo[0].bri.push({firstName: a.bri.firstName, lastName: a.bri.lastName, id: a.bri.id});
        } else {
          res.push({hourDep: hour, bri: [{firstName: a.bri.firstName, lastName: a.bri.lastName, id: a.bri.id}]});
        }
        const available = [];
        avFree.forEach(av => {
          if (av.slot.departureTime.getHours() !== hour) {
            hour += 1;
            bo = res.filter(r => r.hourDep === hour);
            if (bo[0] !== undefined) {
              bo[0].bri.push({firstName: a.bri.firstName, lastName: a.bri.lastName, id: a.bri.id});
            } else {
              res.push({hourDep: hour, bri: [{firstName: a.bri.firstName, lastName: a.bri.lastName, id: a.bri.id}]});
            }
          } else {
            available.push(av);
          }
        });
      }
    });
    return res;
  }

  findTimeSlotByhour(bri: Bri, hourDep: number, date: Date) {
    const bo = bri.appointment.filter(a => {
      const curDate = new Date(a.timeSlot.departureTime);
      if (curDate.getDate() === date.getDate() && curDate.getMonth() === date.getMonth()
        && curDate.getFullYear() === date.getFullYear()) {
        return true;
      }
    })[0];
    return bo.available.filter(av => {
      if (av.reservedBy === undefined && av.slot.departureTime.getHours() === hourDep) {
        return true;
      }
    });
  }
}
