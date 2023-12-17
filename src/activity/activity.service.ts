import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity) private readonly activityRepository: Repository<Activity>,
  ) {}

  create(createActivityDto: CreateActivityDto) {
    try{
      const activity: Activity = new Activity();
      activity.type = createActivityDto.type;
      activity.user = createActivityDto.user;
      activity.post = createActivityDto.post;
      return this.activityRepository.save(activity);
    }
    catch(error){
      throw new BadRequestException(error, { cause: new Error(), description: error })
    }
  }

  viewLikes(id: number) {
    return this.activityRepository.find({
      where: { post: {post_id:id} },
      relations: ['user'],
    });
  }

  countLikes(id: number) {
    return this.activityRepository.count({
      where: { post: {post_id:id} }
    });
  }

}
