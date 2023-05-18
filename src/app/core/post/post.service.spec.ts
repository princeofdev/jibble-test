import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/observable/of';
import { PostService } from './post.service';
import { Post } from './post.interface';
import { POST_RESPONSE } from '../../../tests/post.fixture';

export class MockHttpClient {
  get(): Observable<Post[]> {
    return Observable.of(POST_RESPONSE);
  }

  put(post: Post): Observable<Post> {
    return Observable.of(POST_RESPONSE[0]);
  }
}

describe('PostService', () => {

  let service: PostService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostService,
        {provide: HttpClient, useClass: MockHttpClient}
      ]
    });
    service = TestBed.get(PostService);
    http = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query', () => {
    let response: Post[];
    beforeEach(() => {
      spyOn(http, 'get').and.callThrough();
      service.query().subscribe((resp: Post[]) => {
        response = resp;
      });
    });
    it('should call http.get', () => {
      expect(http.get).toHaveBeenCalledWith(environment.baseApiUrl + 'posts');
    });
    it('should return response', () => {
      expect(response).toEqual(POST_RESPONSE);
    });
  });

  describe('update', () => {
    let response: Post;
    beforeEach(() => {
      spyOn(http, 'put').and.callThrough();
      service.update(POST_RESPONSE[0]).subscribe((resp: Post) => {
        response = resp;
      });
    });
    it('should call http.put', () => {
      expect(http.put).toHaveBeenCalledWith(environment.baseApiUrl + 'posts/1', POST_RESPONSE[0]);
    });
    it('should return response', () => {
      expect(response).toEqual(POST_RESPONSE[0]);
    });
  });

});
