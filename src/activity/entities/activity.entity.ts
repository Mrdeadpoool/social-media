import { Entity, PrimaryGeneratedColumn, ManyToOne ,Column} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  //Can add more types of activities for post
  @Column({ type: 'enum', enum: ['like'] })
  type: string;

  @ManyToOne(() => User, user => user.activity)
  user: User;

  @ManyToOne(() => Post, post => post.activity)
  post: Post;
}


