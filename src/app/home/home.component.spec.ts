import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { CollectionService } from '../core/collection/collection.service';
import { Observable } from 'rxjs/Observable';
import { Collection } from '../core/collection/collection.interface';
import { COLLECTION_RESPONSE } from '../../tests/collection.fixture';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

export class MockCollectionService {
  query(): Observable<Collection[]> {
    return Observable.of(COLLECTION_RESPONSE);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let collectionService: CollectionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {provide: CollectionService, useClass: MockCollectionService}
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    collectionService = TestBed.get(CollectionService);
    spyOn(collectionService, 'query').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call collectionService.query', () => {
      expect(collectionService.query).toHaveBeenCalled();
    });
    it('should set collections', () => {
      expect(component.collections).toEqual(COLLECTION_RESPONSE);
    });
  });

  describe('deleteCollection', () => {
    it('should remove the collection', () => {
      component.collections = COLLECTION_RESPONSE;
      component.deleteCollection(COLLECTION_RESPONSE[1]);
      expect(component.collections.indexOf(COLLECTION_RESPONSE[1])).toBe(-1);
    });
  });


});
