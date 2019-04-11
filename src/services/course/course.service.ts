import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {University} from '../../models/university';
import {UNIVERSITY_MOCKED} from '../../mocks/university.mock';
import {Course} from '../../models/course';
import {Student} from '../../models/student';


@Injectable({
  providedIn: 'root'
})

export class CourseService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */
  private universityUrl = 'http://localhost:9428/api/university';
  public university: University;
  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  // public courses$: Subject<Course[]> = new Subject();


  constructor(private http: HttpClient) {

  }

  getCoursesByUniversity(univId: string, semester: number, major: string) {
    return this.http.get<Course[]>(this.universityUrl + '/' + univId + '/courses?semester='
      + semester + '&major=' + major);
  }
}
