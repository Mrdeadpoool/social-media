import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { PostModule } from './post/post.module';
import { Post } from './post/entities/post.entity';
import { ActivityModule } from './activity/activity.module';
import { Activity } from './activity/entities/activity.entity';
import { FriendModule } from './friend/friend.module';
import { Friend } from './friend/entities/friend.entity';
import { AllExceptionsFilter } from './middleware/AllExceptionFilter';
import { APP_FILTER } from '@nestjs/core';
require('dotenv').config();


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      password: process.env.POSTGRES_PASSWORD,
      username: process.env.POSTGRES_USER,
      entities: [User,Post,Activity,Friend],
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      logging: true,
    }),
    UserModule,
    PostModule,
    ActivityModule,
    FriendModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}