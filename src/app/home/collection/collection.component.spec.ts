import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionComponent } from './collection.component';
import { COLLECTION_RESPONSE } from '../../../tests/collection.fixture';
import { Collection } from '../../core/collection/collection.interface';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../core/post/post.service';
import { Post } from '../../core/post/post.interface';
import { Observable } from 'rxjs/Observable';
import { POST_RESPONSE } from '../../../tests/post.fixture';

export class MockPostService {
  update(post: Post): Observable<Post> {
    return Observable.of(POST_RESPONSE[0]);
  }
}

describe('CollectionComponent', () => {
  let component: CollectionComponent;
  let fixture: ComponentFixture<CollectionComponent>;
  let postService: PostService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        {provide: PostService, useClass: MockPostService}
      ],
      declarations: [CollectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionComponent);
    component = fixture.componentInstance;
    component.collection = COLLECTION_RESPONSE[0];
    fixture.detectChanges();
    postService = TestBed.get(PostService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('deleteCollection', () => {
    it('should emit delete event', () => {
      let emittedCollection: Collection;
      component.onDelete.subscribe((collection: Collection) => {
        emittedCollection = collection;
      });
      component.deleteCollection();
      expect(emittedCollection).toEqual(COLLECTION_RESPONSE[0]);
    });
  });

  describe('enableEditMode', () => {
    it('should disable editMode', () => {
      component.enableEditMode();
      expect(component.editMode).toBeTruthy();
    });
  });

  describe('updatePostTitle', () => {
    beforeEach(() => {
      spyOn(postService, 'update').and.callThrough();
      component.editMode = true;
      component.updatePostTitle();
    });
    it('should call postService.update', () => {
      expect(postService.update).toHaveBeenCalledWith(COLLECTION_RESPONSE[0].post);
    });
    it('should disable editMode', () => {
      expect(component.editMode).toBeFalsy();
    });
  });
});
