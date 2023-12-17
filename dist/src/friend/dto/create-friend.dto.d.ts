import { User } from '../../user/entities/user.entity';
export declare class CreateFriendDto {
    userId: number;
    requester: User;
    status: string;
}
