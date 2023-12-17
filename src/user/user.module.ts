import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
require('dotenv').config();


@Module({
  imports: [
            TypeOrmModule.forFeature([User]),
            JwtModule.register({
              global: true,
              secret: process.env.SECRET,
              signOptions: { expiresIn: '1h' },
            }),
          ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
