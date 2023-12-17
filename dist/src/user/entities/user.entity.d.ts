import { Activity } from '../../activity/entities/activity.entity';
import { Friend } from '../../friend/entities/friend.entity';
import { Post } from '../../post/entities/post.entity';
export declare class User {
    user_id: number;
    name: string;
    username: string;
    email: string;
    age: number;
    password: string;
    gender: string;
    refreshToken: string;
    posts: Post[];
    activity: Activity[];
    friend: Friend[];
}
