import { Injectable } from '@angular/core';
import {Student} from '../../models/student';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Wish} from '../../models/wish';
import {User} from '../../models/user';

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


  getAllStudents() {
    return this.http.get<User[]>(this.studentUrl);
  }
  getStudentById(id: string): Observable<Student> {
    return this.http.get<User>(this.studentUrl + '/' + id);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(this.studentUrl + '/' + id);
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

  updateStudent(user: User) {
    /* const id: string = studentForm.value._id;
     const index: number = this.studentList.findIndex((stud) => stud._id === id.toString());
     const tmp: Student[] = this.studentList.slice(index, index + 1);
     const student: Student = tmp[0];
     const student1: Student = studentForm.getRawValue() as Student;
     student.firstName = student1.firstName;
     student.lastName = student1.lastName;
     student.email = student1.email;
     student.phoneNumber = student1.phoneNumber;
     student.major = student1.major;
     student.year = student1.year;
     this.studentList.push(student);
     console.log(this.studentList[0]); */
    const id: string = user._id;
    return this.http.put<User>(this.studentUrl + '/' + id, {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      studentInfo: {
        major: user.studentInfo.major,
        year: user.studentInfo.year
      }
      });

  }
  /*refactorStudent(student: Student) {
    student.phoneNumber = this.testFormValue(student.phoneNumber);
    student.major = this.testFormValue(student.major);
    student.year = this.testFormValue(student.year);
  }*/
/*
  testFormValue(value: string) {
    if (value === undefined) {
      return '';
    }
    return value;
  }*/

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

  getStudentByStatus(state: string) {
    return this.http.get<User[]>(this.studentUrl + '/student/status/' + state);
  }
}
