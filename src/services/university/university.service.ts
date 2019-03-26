import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {University} from '../../models/university';
import {UNIVERSITY_MOCKED} from '../../mocks/university.mock';


@Injectable({
  providedIn: 'root'
})

export class UniversityService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private universityUrl = '';
  public universityList: University[] = UNIVERSITY_MOCKED;
  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public universities$: BehaviorSubject<University[]> = new BehaviorSubject(this.universityList);

  constructor(private http: HttpClient) {
  }

  getCountries() {
    const countryList = this.universityList.map(value => value.country);
    return countryList;
  }
}
