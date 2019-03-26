import {Wish} from './wish';

export interface Student {
  id?: number;
  lastName?: string;
  firstName?: string;
  email?: string;
  password?: string;
  lastConnection?: Date;
  wishList?: Wish[];
  major?: string;
}
