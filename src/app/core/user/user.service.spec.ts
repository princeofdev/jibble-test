import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import { User } from './user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/observable/of';
import { USER_RESPONSE } from '../../../tests/user.fixture';

export class MockHttpClient {
  get(): Observable<User[]> {
    return Observable.of(USER_RESPONSE);
  }
}

describe('UserService', () => {

  let service: UserService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        {provide: HttpClient, useClass: MockHttpClient}
      ]
    });
    service = TestBed.get(UserService);
    http = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query', () => {
    let response: User[];
    beforeEach(() => {
      spyOn(http, 'get').and.callThrough();
      service.query().subscribe((resp: User[]) => {
        response = resp;
      });
    });
    it('should call http.get', () => {
      expect(http.get).toHaveBeenCalledWith(environment.baseApiUrl + 'users');
    });
    it('should return response', () => {
      expect(response).toEqual(USER_RESPONSE);
    });
  });

});
