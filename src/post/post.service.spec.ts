import { Test, TestingModule } from '@nestjs/testing';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Post } from './entities/post.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

describe('PostService', () => {
  let postService: PostService;
  let postRepository: Repository<Post>;
  let userRepository: Repository<User>;

  const mockPostService = {
    create: jest.fn(),
    getAllPost: jest.fn(),
    getMyPosts: jest.fn(),
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Post),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should create a new post', async () => {
    const createPostDto: CreatePostDto = {
      content: 'New post',
      user: {
        user_id: 1,
        name: '',
        username: '',
        email: '',
        age: 0,
        password: '',
        gender: '',
        posts: [],
        activity: [],
        friend: [],
        refreshToken: ''
      }, 
    };

    const mockUser : User = {
      user_id: 1,
      name: '',
      username: '',
      email: '',
      age: 0,
      password: '',
      gender: '',
      posts: [],
      activity: [],
      friend: [],
      refreshToken: ''
    };

    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue(mockUser);

    const mockCreatedPost = new Post();
    jest.spyOn(postRepository, 'save').mockResolvedValue(mockCreatedPost);

    const result = await postService.create(createPostDto);
    expect(result).toBe(mockCreatedPost);
  });

  it('should throw a BadRequestException if user is not found', async () => {
    const createPostDto: CreatePostDto = {
      content: 'New post',
      user: new User(), 
    };

    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    try {
      await postService.create(createPostDto);
    } 
    catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('User Not Found');
    }
  });

  it('should get all posts', async () => {
    const mockPosts = [new Post(), new Post()];
    jest.spyOn(postRepository, 'find').mockResolvedValue(mockPosts);

    mockPostService.getAllPost.mockResolvedValue(mockPosts);

    const result = await postService.getAllPost();

    expect(result).toEqual(mockPosts);
  });

  it('should get posts by user ID', async () => {
    const userId = 1;
    const mockUser = new User();
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser);

    const mockPosts = [new Post(), new Post()];
    jest.spyOn(postRepository, 'find').mockResolvedValue(mockPosts);

    mockPostService.getMyPosts.mockResolvedValue(mockPosts);

    const result = await postService.getMyPosts(userId);

    expect(result).toEqual(mockPosts);
  });

});
