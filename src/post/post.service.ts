import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '.././user/entities/user.entity';
import { error } from 'console';


@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  
  create(createPostDto: CreatePostDto) {
    return this.userRepository.findOneBy({ user_id: createPostDto.user.user_id })
      .then(user => {
        if (!user) {
          throw new BadRequestException('User Not Found', { description: 'User Not Found' })
        }
        const post: Post = new Post();
        post.content = createPostDto.content;
        post.user = createPostDto.user;
        return this.postRepository.save(post);
      })
      .catch(error => {
        throw new BadRequestException('User Not Found', { description: 'User Not Found' })
      });
  }

  getAllPost() {
    return this.postRepository.find({ relations: ['user'] });
  }

  getMyPosts(id: number) {
    return this.postRepository.find({
      where: { user: {user_id:id} },
      relations: ['user'],
    });

  }

}
