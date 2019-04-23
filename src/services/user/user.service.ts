import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private userUrl = 'http://127.0.0.1:9428/api/users';

  constructor(private http: HttpClient) {
  }

  postMessage(senderId: string, receiverId: string, message: string): Observable<User> {
    return this.http.post<User>(this.userUrl + '/' + senderId + '/message', {
      sendedTo: receiverId,
      content: message
    });
  }
}

