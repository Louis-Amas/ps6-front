import {Wish} from './wish';

export interface Student {
  _id?: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  password?: string;
  lastConnection?: Date;
  wishList?: Wish[];
  major?: string;
}
