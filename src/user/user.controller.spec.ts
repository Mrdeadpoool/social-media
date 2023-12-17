import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signIn.dto';

describe('UserController', () => {
  let controller: UserController;

  const mockUserService = {
    create : jest.fn(CreateUserDto=>{
      return {
        id: 1,
        ...CreateUserDto
      }
    }),

    signIn : jest.fn(SignInDto=>{
      return "accesskey"
    }),

    findAll : jest.fn(()=>{
      const users = [
        { id: 1, name: 'Amri', age: 26, email: 'amri@gmail.com' },
        { id: 2, name: 'Munthasir', age: 25, email: 'Munthasir@gmail.com' },
      ];
      return users;
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user',  () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        username: 'johndoe',
        password: 'password123',
        gender: 'male',
        refreshToken: ''
      };

      const result =  controller.create(createUserDto);
      expect(result).toEqual({ id: 1, ...createUserDto });
    });
  });

  describe('signIn', () => {
    it('should sign in a user', async () => {
      const signInDto: SignInDto = {
        username: 'Amri',
        password: 'password123',
      };

      const result =  controller.signIn(signInDto,null);
      expect(result).toEqual(expect.any(String));
    });
  });


  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: 1, name: 'Amri', age: 26, email: 'amri@gmail.com' },
        { id: 2, name: 'Munthasir', age: 25, email: 'Munthasir@gmail.com' },
      ];
      const result = controller.findAll();
      expect(result).toEqual(users);
    });
  });
});
