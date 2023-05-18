import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Album } from './album.interface';

@Injectable()
export class AlbumService {

  private apiUrl = environment.baseApiUrl + 'albums';

  constructor(private http: HttpClient) { }

  query(): Observable<Album[]> {
    return this.http.get<Album[]>(this.apiUrl);
  }


}
