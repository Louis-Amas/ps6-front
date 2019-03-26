import { Injectable } from '@angular/core';
import { STUDENTS_MOCKED } from '../../mocks/student.mock';
import {Student} from '../../models/student';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Wish} from '../../models/wish';


@Injectable({
  providedIn: 'root'
})

export class StudentService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private studentUrl = '';
  public studentList: Student[] = STUDENTS_MOCKED;
  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public students$: BehaviorSubject<Student[]> = new BehaviorSubject(this.studentList);

  constructor(private http: HttpClient) {
  }

  getStudentById(id: number){
    //need server
  }

  putWishPositionOfOneStudent(studentId: number, prevPosition: number, nextPosition: number) {
    this.studentList.forEach(x => {
      if (x.id === studentId) {
        x.wishList.forEach( w => {
            if (w.position === prevPosition) {
              w.position = nextPosition;
            } else if (w.position === nextPosition) {
              w.position = prevPosition;
            }
          }
        );
      }
    });
    this.students$.next(this.studentList);
  }
}
