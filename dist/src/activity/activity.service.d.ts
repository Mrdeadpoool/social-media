import { CreateActivityDto } from './dto/create-activity.dto';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';
export declare class ActivityService {
    private readonly activityRepository;
    constructor(activityRepository: Repository<Activity>);
    create(createActivityDto: CreateActivityDto): Promise<Activity>;
    viewLikes(id: number): Promise<Activity[]>;
    countLikes(id: number): Promise<number>;
}
