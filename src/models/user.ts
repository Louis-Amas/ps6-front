import {Student} from './student';
import {Teacher} from './teacher';
import {Message} from './message';


enum Role {
  STUDENT = 'student',
  TEACHER = 'teacher',
  BRI = 'bri'
}
export interface User {
  _id?: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  lastConnection?: Date;
  createAd?: Date;
  role?: Role;
  studentInfo?: Student;
  teacherInfo?: Teacher;
  sendedMessage?: Message[];
  receivedMessage?: Message[];
}
