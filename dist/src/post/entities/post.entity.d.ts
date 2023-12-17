import { Activity } from '../../activity/entities/activity.entity';
import { User } from '../../user/entities/user.entity';
export declare class Post {
    post_id: number;
    content: string;
    user: User;
    activity: Activity[];
}
