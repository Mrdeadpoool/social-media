import { Activity } from '../../activity/entities/activity.entity';
import { User } from '../../user/entities/user.entity';
import { Column, Entity, PrimaryGeneratedColumn , ManyToOne ,OneToMany } from 'typeorm';

@Entity()
export class Post {
  
  @PrimaryGeneratedColumn()
  post_id: number;

  @Column({ type: 'varchar' })
  content: string;

  @ManyToOne(() => User, user => user.posts)
  user: User;

  @OneToMany(() => Activity, activity => activity.post)
  activity: Activity[];
}


