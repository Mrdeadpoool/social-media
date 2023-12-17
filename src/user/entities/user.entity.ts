import { Activity } from '../../activity/entities/activity.entity';
import { Friend } from '../../friend/entities/friend.entity';
import { Post } from '../../post/entities/post.entity';
import { Column, Entity, PrimaryGeneratedColumn , OneToMany, OneToOne} from 'typeorm';

@Entity()
export class User {
  
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int', nullable: true  })
  age: number;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   */
  gender: string;


  @Column({ type: 'varchar', nullable: true  })
  refreshToken: string;

  @OneToMany(() => Post, post => post.user)
  posts: Post[];

  @OneToMany(() => Activity, activity => activity.user)
  activity: Activity[];

  @OneToMany(() => Friend, friend => friend.requester)
  friend: Friend[];
}