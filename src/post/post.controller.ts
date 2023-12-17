import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, HttpStatus, NotFoundException, HttpException, UseFilters, ForbiddenException, GoneException, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AllExceptionsFilter } from '../middleware/AllExceptionFilter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserGuard } from '.././user/user.guard';

@ApiTags('Posts') 
@ApiBearerAuth()
@UseGuards(UserGuard)
@Controller('post')
@UseFilters(new AllExceptionsFilter())
 export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body(new ValidationPipe()) createPostDto: CreatePostDto) {   
    return this.postService.create(createPostDto);
  }

  @Get()
  getAllPost() {
    return this.postService.getAllPost();
  }

  @Get(':id')
  getMyPosts(@Param('id') id: string) {
    return this.postService.getMyPosts(+id);
  }
}
