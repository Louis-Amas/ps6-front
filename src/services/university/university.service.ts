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

export class UniversityService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private universityUrl = 'http://localhost:9428/api/university';
  private coursesUrl = 'http://localhost:9428/api/courses';
  public university: University;
  public student: Student;
  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public universities$: Subject<University[]> = new Subject();
  public countries$: Subject<string[]> = new Subject<string[]>();

  constructor(private http: HttpClient) {
    this.getUniversities();
  }

  getUniversities() {
    return this.http.get<University[]>(this.universityUrl).subscribe((universities) => {
      this.universities$.next(universities.map(value => value));
      this.countries$.next(universities.map(value => value.country));
    });
  }

  getByMajor(concernedDepartment: string) {
    return this.http.get<University[]>(this.universityUrl + '/concernedDepartment/' + concernedDepartment);
  }

}
