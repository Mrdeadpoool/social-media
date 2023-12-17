import { Test, TestingModule } from '@nestjs/testing';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { JwtService } from '@nestjs/jwt';
import { CreateActivityDto } from './dto/create-activity.dto';
import { User } from '.././user/entities/user.entity';
import { Post } from '.././post/entities/post.entity';

describe('ActivityController', () => {
  let controller: ActivityController;

  const mockActivityService = {
   
    create : jest.fn(CreatePostDto=>{
      return {
        id: 1,
        ...CreatePostDto
      }
    }),

    viewLikes: jest.fn(()=>{
      const mockActivty = [
        {
          type: 'Like',
          user: new User,
          post: new Post
        }
      ];

      return mockActivty;
      
    }),

    countLikes: jest.fn(()=>{
      return 10;
    }),
  }

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ActivityController],
      providers: [
        {
          provide: ActivityService,
          useValue: mockActivityService, 
        },
        {
          provide: JwtService,
          useValue: mockJwtService, 
        },
      ],
    }).compile();

    controller = module.get<ActivityController>(ActivityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new activity', async () => {
      const createActivityDto: CreateActivityDto = {
        type: 'Like',
        user: new User,
        post: new Post
      };
      const result = controller.create(createActivityDto);
      expect(result).toEqual({ id: 1, ...createActivityDto });
    });
  });

  describe('viewLikes', () => {
    it('should return all likes', async () => {
      const id = 1
      const mockActivty = [
        {
          type: 'Like',
          user: new User,
          post: new Post
        }
      ];
    
      const result = await controller.viewLikes(id.toString()); 
      expect(result).toEqual(mockActivty);
    });
  });

  describe('countLikes', () => {
    it('should return count of likes', async () => {
      const id = 1
      const mockActivty = 10;
    
      const result = await controller.countLikes(id.toString()); 
      expect(result).toEqual(mockActivty);
    });
  });

});
