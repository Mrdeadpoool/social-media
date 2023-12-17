import { CreateFriendDto } from './dto/create-friend.dto';
import { Friend } from './entities/friend.entity';
import { Repository } from 'typeorm';
export declare class FriendService {
    private readonly friendRepository;
    constructor(friendRepository: Repository<Friend>);
    create(createFriendDto: CreateFriendDto): Promise<Friend>;
    viewFriends(id: number): Promise<Friend[]>;
    viewRequest(id: number): Promise<Friend[]>;
    acceptFriend(id: number): Promise<void | Friend>;
}
