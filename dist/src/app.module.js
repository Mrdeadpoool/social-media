"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const user_entity_1 = require("./user/entities/user.entity");
const post_module_1 = require("./post/post.module");
const post_entity_1 = require("./post/entities/post.entity");
const activity_module_1 = require("./activity/activity.module");
const activity_entity_1 = require("./activity/entities/activity.entity");
const friend_module_1 = require("./friend/friend.module");
const friend_entity_1 = require("./friend/entities/friend.entity");
const AllExceptionFilter_1 = require("./middleware/AllExceptionFilter");
const core_1 = require("@nestjs/core");
require('dotenv').config();
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: +process.env.POSTGRES_PORT,
                password: process.env.POSTGRES_PASSWORD,
                username: process.env.POSTGRES_USER,
                entities: [user_entity_1.User, post_entity_1.Post, activity_entity_1.Activity, friend_entity_1.Friend],
                database: process.env.POSTGRES_DATABASE,
                synchronize: true,
                logging: true,
            }),
            user_module_1.UserModule,
            post_module_1.PostModule,
            activity_module_1.ActivityModule,
            friend_module_1.FriendModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_FILTER,
                useClass: AllExceptionFilter_1.AllExceptionsFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map