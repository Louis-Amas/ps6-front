import {Course} from './course';
import {User} from './user';

export interface University {
  _id?: string;
  country?: string;
  name?: string;
  concernedDepartement?: string;
  courses?: Course[];
  url_to_website?: string;
  rankings: User[];
}
