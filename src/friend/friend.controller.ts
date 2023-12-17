import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseFilters } from '@nestjs/common';
import { FriendService } from './friend.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { AllExceptionsFilter } from '../middleware/AllExceptionFilter';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Friend') 
@Controller('friend')
@UseFilters(new AllExceptionsFilter())
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post()
  addFriend(@Body(new ValidationPipe()) createFriendDto: CreateFriendDto) {
    return this.friendService.create(createFriendDto);
  }

  @Patch(':id')
  acceptFriend(@Param('id') id: string) {
    return this.friendService.acceptFriend(+id);
  }

 
  
  @Get('/viewRequets/:id')
  viewRequest(@Param('id') id: string) {
    return this.friendService.viewRequest(+id);
  }

  @Get(':id')
  viewFriends(@Param('id') id: string) {
    return this.friendService.viewFriends(+id);
  }
}
