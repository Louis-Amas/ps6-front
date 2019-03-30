import { Injectable } from '@angular/core';
import { STUDENTS_MOCKED } from '../../mocks/student.mock';
import {Student} from '../../models/student';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {FormGroup} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})

export class StudentService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  private studentUrl = 'http://127.0.0.1:9428/api/users';
  public studentList: Student[] = STUDENTS_MOCKED;
  /**
   * Observable which contains the list of the tickets.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public students$: BehaviorSubject<Student[]> = new BehaviorSubject(this.studentList);
  private header$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private http: HttpClient) {
  }
  public addStudent(student: Student) {
    this.studentList.push(student);
    this.students$.next(this.studentList);
  }
  public findStudent(id: string) {
    return this.studentList.find((stud) => stud._id === id );
  }

  getStudentById(id: string): Observable<Student> {
    return this.http.get<Student>(this.studentUrl + '/' + id);
  }

  putWishPositionOfOneStudent(studentId: string, wishId: number, nextPosition: number) {
    /*this.studentList.forEach(x => {
      if (x._id === studentId) {
        x.wishList.forEach( w => {
            if (w.position === wishId) {
              w.position = nextPosition;
            } else if (w.position === nextPosition) {
              w.position = wishId;
            }
          }
        );
      }
    });
    this.students$.next(this.studentList);*/
  }

  updateStudent(studentForm: FormGroup) {
    const id: string = studentForm.value._id;
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
    console.log(this.studentList[0]);
  }
}
