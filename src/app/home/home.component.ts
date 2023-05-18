import { Component, OnInit } from '@angular/core';
import { CollectionService } from '../core/collection/collection.service';
import { Collection } from '../core/collection/collection.interface';

@Component({
  selector: 'jb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public collections: Collection[];

  constructor(private collectionService: CollectionService) {
  }

  ngOnInit() {
    this.collectionService.query().subscribe((collections: Collection[]) => {
      this.collections = collections;
    });
  }

  deleteCollection(collection: Collection) {
    const index = this.collections.indexOf(collection);
    this.collections.splice(index, 1);
  }


}
