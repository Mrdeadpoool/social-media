import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entities/user.entity';
export declare class Activity {
    id: number;
    type: string;
    user: User;
    post: Post;
}
