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
exports.FriendController = void 0;
const common_1 = require("@nestjs/common");
const friend_service_1 = require("./friend.service");
const create_friend_dto_1 = require("./dto/create-friend.dto");
const AllExceptionFilter_1 = require("../middleware/AllExceptionFilter");
const swagger_1 = require("@nestjs/swagger");
let FriendController = class FriendController {
    constructor(friendService) {
        this.friendService = friendService;
    }
    addFriend(createFriendDto) {
        return this.friendService.create(createFriendDto);
    }
    acceptFriend(id) {
        return this.friendService.acceptFriend(+id);
    }
    viewRequest(id) {
        return this.friendService.viewRequest(+id);
    }
    viewFriends(id) {
        return this.friendService.viewFriends(+id);
    }
};
exports.FriendController = FriendController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_friend_dto_1.CreateFriendDto]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "addFriend", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "acceptFriend", null);
__decorate([
    (0, common_1.Get)('/viewRequets/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "viewRequest", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FriendController.prototype, "viewFriends", null);
exports.FriendController = FriendController = __decorate([
    (0, swagger_1.ApiTags)('Friend'),
    (0, common_1.Controller)('friend'),
    (0, common_1.UseFilters)(new AllExceptionFilter_1.AllExceptionsFilter()),
    __metadata("design:paramtypes", [friend_service_1.FriendService])
], FriendController);
//# sourceMappingURL=friend.controller.js.map