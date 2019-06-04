import {Wish} from './wish';
import {TimeSlot} from './timeSlot';
import {Note} from './note';

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
  notes?: [Note];
  appointment?: {
    timeSlot?: TimeSlot;
    bri?: string;
    status?: string;
  };
}
