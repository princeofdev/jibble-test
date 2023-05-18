import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import 'rxjs/add/observable/of';
import { Album } from './album.interface';
import { AlbumService } from './album.service';
import { ALBUM_RESPONSE } from '../../../tests/album.fixture';

export class MockHttpClient {
  get(): Observable<Album[]> {
    return Observable.of(ALBUM_RESPONSE);
  }
}

describe('AlbumService', () => {

  let service: AlbumService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AlbumService,
        {provide: HttpClient, useClass: MockHttpClient}
      ]
    });
    service = TestBed.get(AlbumService);
    http = TestBed.get(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query', () => {
    let response: Album[];
    beforeEach(() => {
      spyOn(http, 'get').and.callThrough();
      service.query().subscribe((resp: Album[]) => {
        response = resp;
      });
    });
    it('should call http.get', () => {
      expect(http.get).toHaveBeenCalledWith(environment.baseApiUrl + 'albums');
    });
    it('should return response', () => {
      expect(response).toEqual(ALBUM_RESPONSE);
    });
  });

});
