import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { User } from '.././user/entities/user.entity';
export declare class PostService {
    private readonly postRepository;
    private readonly userRepository;
    constructor(postRepository: Repository<Post>, userRepository: Repository<User>);
    create(createPostDto: CreatePostDto): Promise<Post>;
    getAllPost(): Promise<Post[]>;
    getMyPosts(id: number): Promise<Post[]>;
}
