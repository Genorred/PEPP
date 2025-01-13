import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { PostsService } from "../../infrastructure/posts/posts.service";
import { Post } from "../../domain/entities/post.entity";
import { User } from "../../domain/entities/user.entity";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly postsService: PostsService) {
  }

  @ResolveField(() => [Post])
  public async posts(@Parent() user: User): Promise<Post[]> {
    return this.postsService.findMany({ userId: user.id });
  }
}
