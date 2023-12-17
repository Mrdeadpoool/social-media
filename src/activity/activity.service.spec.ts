import { Test, TestingModule } from '@nestjs/testing';
import { ActivityService } from './activity.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './entities/activity.entity';
import { BadRequestException } from '@nestjs/common';
import { User } from '.././user/entities/user.entity';
import { Post } from '.././post/entities/post.entity';

describe('ActivityService', () => {
  let service: ActivityService;
  let activityRepository: Repository<Activity>;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    count: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: getRepositoryToken(Activity),
          useValue: mockRepository, 
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
    activityRepository = module.get<Repository<Activity>>(getRepositoryToken(Activity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create an activity', async () => {
      const createActivityDto = {
        type: 'like',
        user: new User,
        post: new Post
      };

      const savedActivity = new Activity();
      savedActivity.id = 1;
      savedActivity.type = createActivityDto.type;
      savedActivity.user = createActivityDto.user;
      savedActivity.post = createActivityDto.post;

      mockRepository.save.mockResolvedValue(savedActivity);
      const result = await service.create(createActivityDto);
      expect(result).toEqual(savedActivity);
      expect(mockRepository.save).toHaveBeenCalledWith(createActivityDto);
    });
  });

  describe('viewLikes', () => {
    it('should return a list of likes for a post', async () => {
      const postId = 1;
      const expectedLikes = [new Activity(), new Activity()];

      mockRepository.find.mockResolvedValue(expectedLikes);

      const result = await service.viewLikes(postId);

      expect(result).toEqual(expectedLikes);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { post: { post_id: postId } },
        relations: ['user'],
      });
    });
  });

  describe('countLikes', () => {
    it('should return the count of likes for a post', async () => {
      const postId = 1;
      const expectedCount = 5;

      mockRepository.count.mockResolvedValue(expectedCount);

      const result = await service.countLikes(postId);

      expect(result).toEqual(expectedCount);
      expect(mockRepository.count).toHaveBeenCalledWith({
        where: { post: { post_id: postId } },
      });
    });
  });
});
