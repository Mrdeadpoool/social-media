import { Test, TestingModule } from '@nestjs/testing';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { JwtService } from '@nestjs/jwt';
import { CreateFriendDto } from './dto/create-friend.dto';

describe('FriendController', () => {
  let controller: FriendController;

  const mockFriendService = {
   
    create : jest.fn(CreatePostDto=>{
      return {
        id: 1,
        ...CreatePostDto
      }
    }),

    viewRequest: jest.fn(()=>{
      const mockFriends = [
        {
          userId: 1,
          requester: {
            user_id: 2,
            name: '',
            username: '',
            email: '',
            age: 0,
            password: '',
            gender: '',
            posts: [],
            activity: [],
            friend: []
          },
          status : "Pending" 
        }
      ];
      return mockFriends;
      
    }),

    viewFriends: jest.fn(()=>{
      const mockFriends = [
        {
          userId: 1,
          requester: {
            user_id: 2,
            name: '',
            username: '',
            email: '',
            age: 0,
            password: '',
            gender: '',
            posts: [],
            activity: [],
            friend: []
          },
          status : "Accepted" 
        }
      ];

      return mockFriends;
      
    }),

    
    acceptFriend: jest.fn(()=>{
      return true;
    }),
  }

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FriendController],
      providers: [
        {
          provide: FriendService,
          useValue: mockFriendService, 
        },
        {
          provide: JwtService,
          useValue: mockJwtService, 
        },
      ],
    }).compile();

    controller = module.get<FriendController>(FriendController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('addFriend', () => {
    it('add new friend', async () => {
      const createFriendDto: CreateFriendDto = {
        userId: 1,
        requester: {
          user_id: 2,
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
        status : "Pending"
      };
  
      const result = controller.addFriend(createFriendDto);
      expect(result).toEqual({ id: 1, ...createFriendDto });
    });
  });

  describe('viewRequets', () => {
    it('view friend who have requested by id', async () => {
      const userid = 1;
      const mockFriends = [
        {
          userId: 1,
          requester: {
            user_id: 2,
            name: '',
            username: '',
            email: '',
            age: 0,
            password: '',
            gender: '',
            posts: [],
            activity: [],
            friend: []
          },
          status : "Pending" 
        }
      ];
    
      const result = await controller.viewRequest(userid.toString()); 
      expect(result).toEqual(mockFriends);
    });
  });

  describe('viewFriends', () => {
    it('view friends by id', async () => {
      const userid = 1;
      const mockFriends = [
        {
          userId: 1,
          requester: {
            user_id: 2,
            name: '',
            username: '',
            email: '',
            age: 0,
            password: '',
            gender: '',
            posts: [],
            activity: [],
            friend: []
          },
          status : "Accepted" 
        }
      ];
    
      const result = await controller.viewFriends(userid.toString()); 
      expect(result).toEqual(mockFriends);
    });
  });

  describe('acceptFriend', () => {
    it('accept friend request', async () => {
      const friendId = '1';
      const result = await controller.acceptFriend(friendId);
      expect(result).toEqual(true);
      expect(mockFriendService.acceptFriend).toHaveBeenCalledWith(+friendId);
    });
  });

});
