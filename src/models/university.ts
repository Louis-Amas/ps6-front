import {Course} from './course';

export interface University {
  _id?: string;
  country?: string;
  name?: string;
  concernedDepartement?: string;
  courses?: Course[];
  url_to_website?: string;
}
