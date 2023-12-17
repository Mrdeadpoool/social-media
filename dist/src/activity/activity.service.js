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
exports.ActivityService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const activity_entity_1 = require("./entities/activity.entity");
const typeorm_2 = require("typeorm");
let ActivityService = class ActivityService {
    constructor(activityRepository) {
        this.activityRepository = activityRepository;
    }
    create(createActivityDto) {
        try {
            const activity = new activity_entity_1.Activity();
            activity.type = createActivityDto.type;
            activity.user = createActivityDto.user;
            activity.post = createActivityDto.post;
            return this.activityRepository.save(activity);
        }
        catch (error) {
            throw new common_1.BadRequestException(error, { cause: new Error(), description: error });
        }
    }
    viewLikes(id) {
        return this.activityRepository.find({
            where: { post: { post_id: id } },
            relations: ['user'],
        });
    }
    countLikes(id) {
        return this.activityRepository.count({
            where: { post: { post_id: id } }
        });
    }
};
exports.ActivityService = ActivityService;
exports.ActivityService = ActivityService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(activity_entity_1.Activity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ActivityService);
//# sourceMappingURL=activity.service.js.map