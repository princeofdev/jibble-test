import { Collection } from '../app/core/collection/collection.interface';
import { POST_RESPONSE } from './post.fixture';
import { ALBUM_RESPONSE } from './album.fixture';
import { USER_RESPONSE } from './user.fixture';

export const COLLECTION_RESPONSE: Collection[] = [{
  post: POST_RESPONSE[0],
  album: ALBUM_RESPONSE[0],
  user: USER_RESPONSE[0]
}, {
  post: POST_RESPONSE[1],
  album: ALBUM_RESPONSE[1],
  user: USER_RESPONSE[1]
}];
