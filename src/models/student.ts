import {Wish} from './wish';

export interface Student {
  _id?: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  lastConnection?: Date;
  wishes?: Wish[];
  major?: string;
  year?: string;
}
