import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';
import {University} from '../../models/university';
import {Student} from '../../models/student';
import {Course} from '../../models/course';
import {User} from '../../models/user';


@Injectable({
  providedIn: 'root'
})

export class UniversityService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private universityUrl = 'http://localhost:9428/api/university';
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

  getUniversitiesObservable() {
    return this.http.get<University[]>(this.universityUrl);
  }
  getUniversities() {
    return this.http.get<University[]>(this.universityUrl).subscribe((universities) => {
      this.universities$.next(universities.map(value => value));
      this.countries$.next(universities.map(value => value.country));
    });
  }


  addStudentToRanking(univId, studentId, positon) {
    return this.http.post<University>(this.universityUrl + '/' + univId + '/rankings', {
      studentId: studentId,
      position: positon
    });
  }

  updateRankingPosition(univId, studentId, newPosition) {
    return this.http.put<University>(this.universityUrl + '/' + univId + '/student/' + studentId, {
      position: newPosition
    });
  }

  getByMajor(concernedDepartment: string) {
    return this.http.get<University[]>(this.universityUrl + '/concernedDepartment/' + concernedDepartment);
  }

  filterUniversity(search: string, univList: University[]) {
    if (search !== undefined) {
      return univList.filter(univ => univ.name.toLowerCase().includes(search) || univ.country.toLowerCase().includes(search));
    }
  }

  getUniversityById(id: string) {
    return this.http.get<University>(this.universityUrl + '/' + id);
  }

  deleteCourse(course: Course, id: string) {
    return this.http.delete<Course[]>(this.universityUrl + '/' + id + '/courses/' + course._id);
  }

  deleteStudentFromRanking(univId: string, studentId: string) {
    return this.http.delete<University>(this.universityUrl + '/' + univId + '/rankings/student/' + studentId);
  }

  addCourse(id: string, nameUser: string, semesterConcerned: number, linkTo: string,
            ECTS: number, teacher: User, descriptionUser: string ) {
    return this.http.post<University>(this.universityUrl + '/' + id + '/courses', {
      name: nameUser,
      semester: semesterConcerned,
      link_to_courses: linkTo,
      ECTS_count: ECTS,
      major: teacher.teacherInfo.responsible,
      description: descriptionUser,
    });
  }


}
