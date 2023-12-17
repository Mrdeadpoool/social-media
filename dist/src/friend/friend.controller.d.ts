import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
export declare class FriendController {
    private readonly friendService;
    constructor(friendService: FriendService);
    addFriend(createFriendDto: CreateFriendDto): Promise<import("./entities/friend.entity").Friend>;
    acceptFriend(id: string): Promise<void | import("./entities/friend.entity").Friend>;
    viewRequest(id: string): Promise<import("./entities/friend.entity").Friend[]>;
    viewFriends(id: string): Promise<import("./entities/friend.entity").Friend[]>;
}
