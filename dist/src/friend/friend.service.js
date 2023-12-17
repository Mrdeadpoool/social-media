"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendService = void 0;
const common_1 = require("@nestjs/common");
const friend_entity_1 = require("./entities/friend.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let FriendService = class FriendService {
    constructor(friendRepository) {
        this.friendRepository = friendRepository;
    }
    create(createFriendDto) {
        try {
            const friend = new friend_entity_1.Friend();
            friend.userId = createFriendDto.userId;
            friend.requester = createFriendDto.requester;
            friend.status = createFriendDto.status;
            return this.friendRepository.save(friend);
        }
        catch (error) {
            throw new common_1.BadRequestException('User Not Found', { cause: new Error(), description: 'User Not Found' });
        }
    }
    viewFriends(id) {
        try {
            return this.friendRepository.find({
                where: {
                    userId: id,
                    status: 'Accepted'
                },
                relations: ['requester'],
            });
        }
        catch (error) {
            throw new common_1.BadRequestException('User Not Found', { cause: new Error(), description: 'User Not Found' });
        }
    }
    viewRequest(id) {
        try {
            return this.friendRepository.find({
                where: {
                    userId: id,
                    status: 'Pending'
                },
                relations: ['requester'],
            });
        }
        catch (err) {
            throw new common_1.BadRequestException('User Not Found', { description: 'User Not Found' });
        }
    }
    acceptFriend(id) {
        return this.friendRepository.findOneBy({ id: id })
            .then(friend => {
            if (!friend) {
                throw new common_1.NotFoundException('User not found');
            }
            friend.status = "Accepted";
            return this.friendRepository.save(friend).catch(err => console.error(err));
        })
            .catch(error => {
            throw new common_1.BadRequestException(error, { cause: new Error(), description: error });
        });
    }
};
exports.FriendService = FriendService;
exports.FriendService = FriendService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(friend_entity_1.Friend)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FriendService);
//# sourceMappingURL=friend.service.js.map