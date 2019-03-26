import {Course} from './course';

export interface University {
  id?: number;
  country?: string;
  name?: string;
  concernedDepartement?: string;
  courses: Course[];
}
