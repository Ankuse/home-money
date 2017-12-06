import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {BillService} from '../../system/shared/services/bill.service';
import {isUndefined} from 'util';

@Injectable()
export class UsersService extends BillService {

  constructor(
      public http: Http
  ) {
    super(http);
  }

  /*getUserByEmail(email: string): Observable<User> {
    return this.http.get(`http://localhost:3000/users?email=${email}`)
        .map( (response: Response ) => response.json())
        .map( (user: User[] ) => user[0] ? user[0] : undefined );
  }*/

  getUserByEmail(email: string): Observable<User> {
    return this.get(`users?email=${email}`)
        .map( (users: User[]) => users[0] ? users[0] : undefined );
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }

  /*createNewUser(user: User): Observable<User> {
    return this.http.post('http://localhost:3000/users', user)
        .map( (response: Response) => response.json() );
  }*/

}
