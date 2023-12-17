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
    isInt,
  } from 'class-validator';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entities/user.entity';
  
export class CreateActivityDto {
    
    @IsNotEmpty({message: "Type cannot be blank"})
    type: string;
  
    @IsNotEmpty({message: "User cannot be blank"})
    user: User;

    @IsNotEmpty({message: "Post cannot be blank"})
    post: Post
}

