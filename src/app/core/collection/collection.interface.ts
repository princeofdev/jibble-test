import { Post } from '../post/post.interface';
import { Album } from '../album/album.interface';
import { User } from '../user/user.interface';

export interface Collection {
  post: Post;
  album: Album;
  user: User;
}
