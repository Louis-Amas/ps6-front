import {TimeSlot} from './timeSlot';
import {User} from './user';

export interface Bri {
  appointment?: {
    timeSlot?: TimeSlot;
    available?: {
      _id?: string,
      reservedBy?: User;
      slot?: TimeSlot;
    }[]
  }[];
}
