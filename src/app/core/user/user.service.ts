import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from './user.interface';

@Injectable()
export class UserService {

  private apiUrl = environment.baseApiUrl + 'users';

  constructor(private http: HttpClient) { }

  query(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

}
