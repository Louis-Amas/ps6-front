import {Wish} from './wish';
import {TimeSlot} from './timeSlot';

export interface Student {
  _id?: string;
  lastName?: string;
  firstName?: string;
  email?: string;
  lastYearMajor: string;
  password?: string;
  numStu?: number;
  lastConnection?: Date;
  wishes?: Wish[];
  major?: string;
  year?: string;
  stateValidation?: string;
  attachments: any[];
  bestWishRank: number;
  notes?: [
    {
      _id: string,
      year: number,
      schoolLevel: string,
      school: string,
      note: number
    }];
  appointment?: {
    timeSlot?: TimeSlot;
    bri?: string;
  };
}
