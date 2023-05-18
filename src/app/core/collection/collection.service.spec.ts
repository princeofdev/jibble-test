import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { ALBUM_RESPONSE } from '../../../tests/album.fixture';
import { Collection } from './collection.interface';
import { CollectionService } from './collection.service';
import { User } from '../user/user.interface';
import { USER_RESPONSE } from '../../../tests/user.fixture';
import { UserService } from '../user/user.service';
import { AlbumService } from '../album/album.service';
import { PostService } from '../post/post.service';
import { Post } from '../post/post.interface';
import { POST_RESPONSE } from '../../../tests/post.fixture';
import { Album } from '../album/album.interface';

export class MockUserService {
  query(): Observable<User[]> {
    return Observable.of(USER_RESPONSE);
  }
}

export class MockPostService {
  query(): Observable<Post[]> {
    return Observable.of(POST_RESPONSE);
  }
}

export class MockAlbumService {
  query(): Observable<Album[]> {
    return Observable.of(ALBUM_RESPONSE);
  }
}

describe('CollectionService', () => {

  let service: CollectionService;
  let userService: UserService;
  let postService: PostService;
  let albumService: AlbumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionService,
        {provide: UserService, useClass: MockUserService},
        {provide: PostService, useClass: MockPostService},
        {provide: AlbumService, useClass: MockAlbumService}
      ]
    });
    service = TestBed.get(CollectionService);
    userService = TestBed.get(UserService);
    postService = TestBed.get(PostService);
    albumService = TestBed.get(AlbumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('query', () => {
    let response: Collection[];
    beforeEach(() => {
      spyOn(postService, 'query').and.callThrough();
      spyOn(albumService, 'query').and.callThrough();
      spyOn(userService, 'query').and.callThrough();
      spyOn(Math, 'floor').and.returnValue(0);
      service.query().subscribe((resp: Collection[]) => {
        response = resp;
      });
    });
    it('should call postService.query', () => {
      expect(postService.query).toHaveBeenCalled();
    });
    it('should call albumService.query', () => {
      expect(postService.query).toHaveBeenCalled();
    });
    it('should call userService.query', () => {
      expect(postService.query).toHaveBeenCalled();
    });
    it('should return an array of 30 items', () => {
      expect(response.length).toBe(30);
    });
    it('should return an array of collections', () => {
      for (let i = 0; i < 30; i++) {
        expect(response[i]).toEqual({
          post: POST_RESPONSE[0],
          album: ALBUM_RESPONSE[0],
          user: USER_RESPONSE[0]
        });
      }
    });
  });

});
