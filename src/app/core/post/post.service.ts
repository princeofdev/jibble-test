import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Post } from './post.interface';

@Injectable()
export class PostService {

  private apiUrl = environment.baseApiUrl + 'posts';

  constructor(private http: HttpClient) {
  }

  query(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(this.apiUrl + '/' + post.id, post);
  }

}
