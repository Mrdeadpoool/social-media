import {
    IsAlphanumeric,
    IsEmail,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Matches,
    MinLength,
  } from 'class-validator';
  
  export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must have atleast 2 characters.' })
    @IsNotEmpty()
    name: string;
  
    @IsNotEmpty()
    @MinLength(3, { message: 'Username must have atleast 3 characters.' })
    @IsAlphanumeric('en-US', {
      message: 'Username does not allow other than alpha numeric chars.',
    })
    username: string;
  
    @IsNotEmpty()
    @IsEmail({}, { message: 'Please provide valid Email.' })
    email: string;
  
    @IsOptional()
    @IsInt()
    age: number;
  
    @IsString()
    @IsEnum(['f', 'm', 'u'])
    gender: string;
  
    @IsString()
    @IsNotEmpty({ message: 'Password cannot be blank' })
    @MinLength(7, { message: 'Password must be at least 7 characters' })
    password: string;

    @IsOptional()
    refreshToken:string;
  }