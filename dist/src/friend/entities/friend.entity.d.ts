import { User } from '../../user/entities/user.entity';
export declare class Friend {
    id: number;
    userId: number;
    requester: User;
    status: string;
}
