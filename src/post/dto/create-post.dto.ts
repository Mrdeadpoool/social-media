
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
import { User } from '../../user/entities/user.entity';
  

export class CreatePostDto {
    
    @IsNotEmpty({message: "Content cannot be blank"})
    content: string;
  
    @IsNotEmpty()
    user: User;
}
