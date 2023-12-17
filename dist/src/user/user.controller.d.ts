import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SignInDto } from './dto/signIn.dto';
import { Response as ExpressResponse, Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    signIn(signInDto: SignInDto, response: ExpressResponse): Promise<unknown>;
    refreshToken(req: Request): Promise<unknown>;
    findAll(): Promise<import("./entities/user.entity").User[]>;
}
