import { Test, TestingModule } from '@nestjs/testing';
import { FriendService } from './friend.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateFriendDto } from './dto/create-friend.dto';

describe('FriendService', () => {
  let service: FriendService;
  let friendRepository: Repository<Friend>;

  const mockRepository = {
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FriendService,
        {
          provide: getRepositoryToken(Friend),
          useValue: mockRepository, 
        },
      ],
    }).compile();

    service = module.get<FriendService>(FriendService);
    friendRepository = module.get<Repository<Friend>>(getRepositoryToken(Friend));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a friend', async () => {
      const createFriendDto : CreateFriendDto = {
        userId: 1,
        requester:{
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
        } ,
        status: 'Accepted',
      };

      const savedFriend = new Friend();
      savedFriend.id = 1;
      savedFriend.userId = createFriendDto.userId;
      savedFriend.requester = createFriendDto.requester;
      savedFriend.status = createFriendDto.status;

    
      mockRepository.save.mockResolvedValue(savedFriend);
      const result = await service.create(createFriendDto);

      expect(result).toEqual(savedFriend);
      expect(mockRepository.save).toHaveBeenCalledWith(createFriendDto);
    });
  });

  describe('viewFriends', () => {
    it('should return a list of friends with status Accepted', async () => {
      const userId = 1;
      const expectedFriends = [new Friend(), new Friend()];

      mockRepository.find.mockResolvedValue(expectedFriends);
      const result = await service.viewFriends(userId);

      expect(result).toEqual(expectedFriends);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {
          userId,
          status: 'Accepted',
        },
        relations: ['requester'],
      });
    });

   
  });

  describe('viewRequest', () => {
    it('should return a list of friend requests with status "Pending"', async () => {
      const userId = 1;
      const expectedFriendRequests = [new Friend(), new Friend()];

      mockRepository.find.mockResolvedValue(expectedFriendRequests);
      const result = await service.viewRequest(userId);

      expect(result).toEqual(expectedFriendRequests);
      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {
          userId,
          status: 'Pending',
        },
        relations: ['requester'],
      });
    });

  });

  describe('acceptFriend', () => {
    it('should accept a friend request', async () => {
      const friendId = 1;
      const friend = new Friend();
      friend.id = friendId;

      mockRepository.findOneBy.mockResolvedValue(friend);
      const result = await service.acceptFriend(friendId);
      expect(mockRepository.save).toHaveBeenCalledWith(friend);
    });
  });
});
