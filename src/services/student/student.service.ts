import { Injectable } from '@angular/core';
import { STUDENTS_MOCKED } from '../../mocks/student.mock';
import {Student} from '../../models/student';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';


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
    this.students$.next(this.studentList);
  }
}
