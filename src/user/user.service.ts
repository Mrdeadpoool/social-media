import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './dto/signIn.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response as ExpressResponse, Request } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
require('dotenv').config();

@Injectable()
export class UserService {
  refreshToken(req: Request) {
    return new Promise((resolve) => {
     
      const cookie = req.cookies;
      if(!cookie?.jwt) 
      {   
        throw new InternalServerErrorException('No Token Found');
      }   
      const refreshToken = cookie.jwt;
      this.userRepository.
          findOne({where: { refreshToken : refreshToken}}).
          then((data: { email: any; })=>{   

            const decoded = this.jwtService.verify(refreshToken,{secret: process.env.REFRESH_TOKEN_SECRET,})
                    
            if(data.email != decoded.email)
            {
              throw new InternalServerErrorException('Invalid Token');

            } 
            const payload = {  email: data.email };
            const access_token = this.jwtService.sign(payload)
            resolve(access_token)
                    
      }) ;
    });
    
  }

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  
  create(createUserDto: CreateUserDto): Promise<User> {
      try{
        return new Promise((resolve) => {
          bcrypt.hash(createUserDto.password, 10, (err: any, hash: string) => {
            if (err) {
              throw new InternalServerErrorException('Could not hash password');
            } else {
              const user = new User();
              user.name = createUserDto.name;
              user.age = createUserDto.age;
              user.email = createUserDto.email;
              user.username = createUserDto.username;
              user.password = hash; // Set the hashed password
              user.gender = createUserDto.gender;
    
              this.userRepository
                .save(user)
                .then((savedUser) => resolve(savedUser))
                .catch((error) => {
                  console.error('Error creating user:', error);
                  throw new InternalServerErrorException('Could not create user');
                });
            }
          });
        });
      }
      catch(error){
        throw new InternalServerErrorException();
      }
  }

  findAll() {
    return this.userRepository.find();
  }

  signIn(signInDto: SignInDto,res: ExpressResponse){

    return new Promise((resolve, reject) => {
      this.userRepository.findOne({ where: { username : signInDto.username } })
        .then(user=>{
          bcrypt.compare(signInDto.password, user.password, (err, result) => {
            if (err) {
              reject(new NotFoundException('Invalid password'));
            } else {
              const payload = {  email: user.email };
              const REFRESH_TOKEN_SECRET =  process.env.REFRESH_TOKEN_SECRET
              const access_token = this.jwtService.sign(payload,)
              const refreshToken =  this.jwtService.sign(payload, {
                                                                    secret: REFRESH_TOKEN_SECRET,
                                                                    expiresIn: "1d",
                                                                  });
             
              //Saving Refresh Token in DB and setting cookie
              res.cookie('jwt', refreshToken, {
                maxAge: 3600000, // 1 hour (adjust as needed)
                secure: false, // Set to true in production if using HTTPS
                httpOnly: true, // Ensures the cookie can only be accessed via HTTP (not JavaScript)
              });
              user.refreshToken = refreshToken; 
              this.userRepository.save(user)
              resolve(access_token); 
            }
          });
        }).catch(error=>{
          reject(new NotFoundException('User not found'));
        });    
    });

   
  }

}
