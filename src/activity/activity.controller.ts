import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseFilters, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { AllExceptionsFilter } from '../middleware/AllExceptionFilter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '.././user/user.guard';


@ApiTags('Activity') 
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('activity')
@UseFilters(new AllExceptionsFilter())
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body(new ValidationPipe()) createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get('/viewLikes/:id')
  viewLikes(@Param('id') id: string) {
    return this.activityService.viewLikes(+id);
  }

  @Get(':id')
  countLikes(@Param('id') id: string) {
    return this.activityService.countLikes(+id);
  }

}
