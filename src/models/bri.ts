import {TimeSlot} from './timeSlot';
import {User} from './user';

export interface Bri {
  appointment?: {
    timeSlot?: TimeSlot;
    available?: {
      reservedBy?: User;
      slot?: TimeSlot;
    }[]
  }[];
}
