
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostsService } from "../posts/posts.service";
import { Post } from "../posts/entities/post.entity";
import { User } from "../posts/entities/user.entity";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly postsService: PostsService) {}

  @ResolveField(() => [Post])
  public async posts(@Parent() user: User): Promise<Post[]> {
    return this.postsService.findMany({userId: user.id});
  }
}
