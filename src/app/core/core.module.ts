import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { PostService } from './post/post.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './user/user.service';
import { AlbumService } from './album/album.service';
import { CollectionService } from './collection/collection.service';

@NgModule({
  imports: [
    HttpClientModule
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        PostService,
        UserService,
        AlbumService,
        CollectionService
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
