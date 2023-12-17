import { Test, TestingModule } from '@nestjs/testing';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { JwtService } from '@nestjs/jwt';
import { CreatePostDto } from './dto/create-post.dto';

describe('PostController', () => {
  let controller: PostController;

  const mockPostService = {
   
    create : jest.fn(CreatePostDto=>{
      return {
        id: 1,
        ...CreatePostDto
      }
    }),

    getAllPost: jest.fn(()=>{
      const mock = [{
        id: 1,
        content: 'Test',
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
          friend: []
        }
      }];

      return mock;
      
    }),

    getMyPosts: jest.fn(()=>{
      const mock = [{
        id: 1,
        content: 'Test',
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
          friend: []
        }
      }];

      return mock;
      
    }),
  }

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: PostService,
          useValue: mockPostService, 
        },
        {
          provide: JwtService,
          useValue: mockJwtService, 
        },
      ],
    })
    .compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new post', async () => {
      const createPostDto: CreatePostDto = {
        content: 'Test',
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
        } 
      };
  
      const result = controller.create(createPostDto);
      expect(result).toEqual({ id: 1, ...createPostDto });
    });
  });

  describe('getAllPost', () => {
    it('should return all posts', async () => {
      const mockPosts = [
        {
          id: 1,
          content: 'Test',
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
            friend: []
          } 
        }
      ];
    
      const result = await controller.getAllPost(); 
      expect(result).toEqual(mockPosts);
    });
  });

  describe('getMyPosts', () => {
    it('should return a specific posts by ID', async () => {
      // Mock the postService's getMyPosts method to return a specific post
      const postId = 1;
      const mockPosts = [
        {
          id: 1,
          content: 'Test',
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
            friend: []
          } 
        }
      ];
  
      const result = await controller.getMyPosts(postId.toString());
      expect(result).toEqual(mockPosts);
    });
  })

});
