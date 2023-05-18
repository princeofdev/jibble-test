import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Collection } from './collection.interface';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';
import { AlbumService } from '../album/album.service';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Injectable()
export class CollectionService {

  constructor(private userService: UserService,
              private postService: PostService,
              private albumService: AlbumService) {
  }

  query(): Observable<Collection[]> {
    return Observable.forkJoin([
      this.postService.query(),
      this.albumService.query(),
      this.userService.query()
    ])
      .map((data: any[]) => {
        return Array.from({length: 30}, i => this.buildCollection(data));
      });
  }

  private buildCollection(data: any[]): Collection {
    return {
      post: this.getRandomItem(data[0]),
      album: this.getRandomItem(data[1]),
      user: this.getRandomItem(data[2])
    };
  }

  private getRandomItem(data: any): any {
    const randomIndex: number = Math.floor(Math.random() * data.length);
    return data[randomIndex];
  }

}
