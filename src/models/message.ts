import {User} from './user';

export interface Message {
  _id?: string;
  sendedTo?: User;
  receivedFrom?: User;
  content?: string;
}
