import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Collection } from '../../core/collection/collection.interface';
import { PostService } from '../../core/post/post.service';

@Component({
  selector: 'jb-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  @Input() collection: Collection;
  @Output() onDelete: EventEmitter<Collection> = new EventEmitter();
  public editMode: boolean;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
  }

  deleteCollection() {
    this.onDelete.emit(this.collection);
  }

  enableEditMode() {
    this.editMode = true;
  }

  updatePostTitle() {
    this.postService.update(this.collection.post).subscribe(() => {
      this.editMode = false;
    });
  }

}
