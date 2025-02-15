import { Parent, ResolveField, Resolver } from "@nestjs/graphql";
import { Post } from "../../domain/entities/post.entity";
import { User } from "../../domain/entities/user.entity";
import { PostsRepository } from "../../domain/repositories/posts/posts.repository";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly postsRepository: PostsRepository) {
  }

  @ResolveField(() => [Post])
  public async posts(@Parent() user: User): Promise<Post[]> {
    return this.postsRepository.findMany({ userId: user.id });
  }
}
