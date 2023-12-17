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
import { User } from '../../user/entities/user.entity';
  
export class CreateFriendDto {
    
    @IsInt()
    @IsNotEmpty({message: "User cannot be blank"})
    userId: number;
  
    @IsNotEmpty({message: "Requester cannot be blank"})
    requester: User;

    @IsNotEmpty({message: "Status cannot be blank"})
    status:string

}
