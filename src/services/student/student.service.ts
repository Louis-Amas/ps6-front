import { Injectable } from '@angular/core';
import { STUDENTS_MOCKED } from '../../mocks/student.mock';
import {Student} from '../../models/student';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Wish} from '../../models/wish';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private studentUrl = 'http://127.0.0.1:9428/api/users';
  private studentUrl2 = 'http://127.0.0.1:9428/api';
  public studentList: Student[] = STUDENTS_MOCKED;
  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public students$: BehaviorSubject<Student[]> = new BehaviorSubject(this.studentList);
  private header$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
  }
  public findStudent(id: string) {
    return this.studentList.find((stud) => stud._id === id );
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(this.studentUrl + '/' + id);
  }

  getWishesOfOneStudent(studentId: string) {
    return this.http.get<Wish[]>(this.studentUrl + '/student/' + studentId + '/wishes');
  }

  putWishPositionOfOneStudent(studentId: string, wishId: number, nextPosition: number) {
  }

  deleteWishOfOneStudent(studentId: string, univId: string) {
    return this.http.delete<Wish[]>(this.studentUrl + '/student/' + studentId + '/wishes/' + univId);
  }

  updateStudent(student: Student) {
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
    const id: string = student._id;
    this.http.put(this.studentUrl + '/' + id, {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      /* phoneNumber: student.phoneNumber,
      major: student.major,
      year: student.year */});

  }
  refactorStudent(student: Student) {
    student.phoneNumber = this.testFormValue(student.phoneNumber);
    student.major = this.testFormValue(student.major);
    student.year = this.testFormValue(student.year);
  }

  testFormValue(value: string) {
    if (value === undefined) {
      return '';
    }
    return value;
  }

  addWish(coursesId: string[], univId: string, studentId: string) {
    return this.http.post(this.studentUrl + '/student/' + studentId + '/wishes', {
      university: univId,
      courses: coursesId,
    });
  }
}
