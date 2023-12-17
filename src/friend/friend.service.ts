import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { Friend } from './entities/friend.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FriendService {

  constructor(
    @InjectRepository(Friend) private readonly friendRepository: Repository<Friend>,
  ) {}

  create(createFriendDto: CreateFriendDto) {
    try{
      const friend: Friend = new Friend();
      friend.userId = createFriendDto.userId;
      friend.requester = createFriendDto.requester;
      friend.status = createFriendDto.status;
      return this.friendRepository.save(friend);
    }
    catch(error){
      throw new BadRequestException('User Not Found', { cause: new Error(), description: 'User Not Found' })
    }
   

  }

  viewFriends(id: number) {
    try{
      return this.friendRepository.find({
        where: {
           userId: id,
           status: 'Accepted'
        },
        relations: ['requester'],
      });
    }
    catch(error){
      throw new BadRequestException('User Not Found', { cause: new Error(), description: 'User Not Found' })
    }
   
  }

  viewRequest(id: number) {
    
    try{
      return this.friendRepository.find({
        where: {
           userId: id,
           status: 'Pending'
        },
        relations: ['requester'],
      });
    }
    catch(err){
      throw new BadRequestException('User Not Found', {description: 'User Not Found' })
    }
   


  }

  acceptFriend(id: number) {
    return this.friendRepository.findOneBy({ id: id })
      .then(friend => {
        if (!friend) {
          throw new NotFoundException('User not found');
        }
        friend.status = "Accepted"; 
        return this.friendRepository.save(friend).catch(
          err => console.error(err)
        );
      })
      .catch(error => {
        throw new BadRequestException(error, { cause: new Error(), description: error })
      });
  }

  
}
