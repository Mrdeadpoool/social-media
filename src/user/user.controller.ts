import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseFilters, Res, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInDto } from './dto/signIn.dto';
import { AllExceptionsFilter } from '../middleware/AllExceptionFilter';
import { ApiTags } from '@nestjs/swagger';
import { Response as ExpressResponse, Request } from 'express'; 

@ApiTags('Users') 
@Controller('user')
@UseFilters(new AllExceptionsFilter())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post("/SignIn")
   signIn(@Body(new ValidationPipe()) signInDto: SignInDto,@Res({ passthrough: true }) response: ExpressResponse) {
    return  this.userService.signIn(signInDto,response);
  }

  @Post("/RefreshToken")
  refreshToken(@Req() req: Request) {
   return  this.userService.refreshToken(req);
 }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
