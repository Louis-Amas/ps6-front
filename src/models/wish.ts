import {University} from './university';
import {Course} from './course';

export interface Wish {
  id?: number;
  position?: number;
  university?: University;
  courses?: string[];
}
