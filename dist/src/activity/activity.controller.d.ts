import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
export declare class ActivityController {
    private readonly activityService;
    constructor(activityService: ActivityService);
    create(createActivityDto: CreateActivityDto): Promise<import("./entities/activity.entity").Activity>;
    viewLikes(id: string): Promise<import("./entities/activity.entity").Activity[]>;
    countLikes(id: string): Promise<number>;
}
