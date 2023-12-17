import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';
import { Response as ExpressResponse, Request } from 'express';
export declare class UserService {
    private readonly userRepository;
    private jwtService;
    refreshToken(req: Request): Promise<unknown>;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    create(createUserDto: CreateUserDto): Promise<User>;
    findAll(): Promise<User[]>;
    signIn(signInDto: SignInDto, res: ExpressResponse): Promise<unknown>;
}
