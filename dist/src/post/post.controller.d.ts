import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    create(createPostDto: CreatePostDto): Promise<import("./entities/post.entity").Post>;
    getAllPost(): Promise<import("./entities/post.entity").Post[]>;
    getMyPosts(id: string): Promise<import("./entities/post.entity").Post[]>;
}
