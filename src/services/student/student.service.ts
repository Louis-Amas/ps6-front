import { Injectable } from '@angular/core';
import {Student} from '../../models/student';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Wish} from '../../models/wish';
import {User} from '../../models/user';
import {Course} from '../../models/course';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private studentUrl = 'http://127.0.0.1:9428/api/users';
  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */

  constructor(private http: HttpClient) {
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(this.studentUrl + '/' + id);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.studentUrl + '/' + id);
  }

  getAllStudentsWithUniversityInWishes(univId) {
    return this.http.get<User[]>(this.studentUrl + '/student/wishes/university/' + univId);
  }

  getWishesOfOneStudent(studentId: string) {
    return this.http.get<Wish[]>(this.studentUrl + '/student/' + studentId + '/wishes');
  }

  putWishPositionOfOneStudent(studentId: string, univId: string, nextPosition: number) {
    return this.http.put<Wish[]>(this.studentUrl + '/student/' + studentId + '/wishes/' + univId, {
      position: nextPosition
    });
  }

  deleteWishOfOneStudent(studentId: string, univId: string) {
    return this.http.delete<Wish[]>(this.studentUrl + '/student/' + studentId + '/wishes/' + univId);
  }

  updateStudentLastYearSpeciality(studentId: string, speciality: string) {
    return this.http.put<User>(this.studentUrl + '/student/' + studentId, {
      lastYearMajor: speciality
    });
  }

  addWish(coursesId: string[], univId: string, studentId: string) {
    return this.http.post(this.studentUrl + '/student/' + studentId + '/wishes', {
      university: univId,
      courses: coursesId,
    });
  }

  updateStudentState(studentId: string, state: string) {
    return this.http.put<User>(this.studentUrl + '/student/' + studentId, {
      stateValidation: state,
    });
  }

  getCourseOfWish(wish: Wish) {
    const idCourses = wish.courses;
    return  wish.university.courses.filter( course => {
      if (course !== undefined) {
        if (idCourses.find(x => x === course._id)) {
          return course;
        }
      }
    });
  }

  uploadFile(file: any, studentId: string) {
    const attachs = [];
    attachs.push(file);
    return this.http.post(this.studentUrl + '/student/' + studentId + '/attachments', {
      attachments: attachs,
    });
  }

  getStudentsByStatus(state: string, major: string) {
    if (major !== undefined) {
      return this.http.get<User[]>(this.studentUrl + '/student/status/' + state + '?major=' + major);

    } else {
      return this.http.get<User[]>(this.studentUrl + '/student/status/' + state);
    }
  }

  updateWish(id: string, univ: string, courses: Course[]) {
    const res = [];
    courses.forEach( c => res.push(c._id));
    return this.http.put<Student>(this.studentUrl + '/student/' + id + '/wishes/' + univ, {
      courses: res
    });
  }

  createFileNameWithNote(note: any, filename: string) {
    let mark = '';
    note.note.toString().split('.').forEach(n =>  mark += n);
    if (filename) {
      const end = filename.split('.')[1];
      return 'note' + note.year + mark + '.' + end;
    }
    return 'note' + note.year + mark;
  }

  getBase64(file, cb) {
    const reader = new FileReader();
    reader.onload = (event) => cb(reader.result);
    reader.readAsDataURL(file);
  }

  insertNote(mark: any, userId: string) {
    return this.http.post<User>(this.studentUrl + '/student/' + userId + '/notes', {
      note: mark,
    });
  }
}

