import { User } from '../../user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column,OneToOne } from 'typeorm';


@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.friend)
  requester: User;

  @Column()
  status: string; // 'requested', 'accepted', etc.
}