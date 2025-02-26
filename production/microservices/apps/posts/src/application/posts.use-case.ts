import { PostsRepository } from "../domain/repositories/posts/posts.repository";
import { SearchRepository } from "../domain/repositories/posts/search.repository";
import { PreferencesRepository } from "../domain/repositories/posts/preferenses.repository";
import { CreatePostDto, CreatePostServiceDto } from "../domain/dto/posts/create-post.dto";
import { Inject, UnauthorizedException } from "@nestjs/common";
import { FindAllPostsDto } from "../domain/dto/posts/_nextjs_find-posts.dto";
import FRONTEND_SERVER from "../infrastructure/config/frontend-server";
import { ConfigType } from "@nestjs/config";
import { FindPostDto, FindPostInputService } from "../domain/dto/posts/find-post.dto";
import { FindAlgorithmPostsDto } from "../domain/dto/posts/find-algorithm-posts.dto";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { RemovePostInputService } from "../domain/dto/posts/remove-post.dto";
import { PostsSecurityCheckService } from "../domain/domain_services/posts.security.check.service";
import { ClientCacheRepository } from "../domain/repositories/client.cache.repository";
import { UpdatePostInputService } from "../domain/dto/posts/update-post.dto";
import { Recommendations } from "../interfaces/dto/posts/output/recommendations.output";
import { FindUserPostsDto } from "../domain/dto/posts/find-user-posts.dto";

export class PostsUseCase {
  constructor(
    private readonly postsRepository: PostsRepository,
    private readonly clientCacheRepository: ClientCacheRepository,
    private readonly searchService: SearchRepository,
    @Inject(FRONTEND_SERVER.KEY) private readonly configService: ConfigType<typeof FRONTEND_SERVER>,
    private readonly postsSecurityCheckService: PostsSecurityCheckService,
    private readonly preferencesService: PreferencesRepository) {
  }

  async create(createPostInput: CreatePostServiceDto) {
    const post = await this.postsRepository.create(createPostInput);
    void this.searchService.indexPost(post);
    return post;
  }

  findAll(findAllPostsInput: FindAllPostsDto) {
    const { token } = findAllPostsInput;
    if (this.configService.token === token) {
      return this.postsRepository.findMany({});
    } else {
      throw new UnauthorizedException();
    }
  }

  async findUserPosts(input: FindUserPostsDto): Promise<Recommendations> {
    const { userId, skipPages, rating, topics, subTopics, topicsOrSubTopics, createdAt } = input;
    const pageSize = 20;
    const params = {
      userId,
      rating,
      topics,
      subTopics,
      topicsOrSubTopics,
      createdAt
    }
    const [data, totalCount] = await Promise.all([
      this.postsRepository.findMany(
        {
          ...params,
          take: pageSize,
          skip: skipPages,
        }
      ),
      this.postsRepository.count(params)
    ]);
    return {
      totalPages: Math.max(Math.floor(totalCount / pageSize), 1),
      data
    };
  }

  async findOne(input: FindPostInputService) {
    const { userId, id } = input;
    const post = await this.postsRepository.findOne({ id });
    this.postsSecurityCheckService.ifShouldBeForbidden(post, userId);
    console.log(post);
    return post;
  }

  // async update(updatePostInput: UpdatePostInputService) {
  //   const { id, ...body } = updatePostInput;
  //   const post = await this.postsRepository.update({ ...body, id });
  //   await this.searchService.updatePost(post);
  //   return post;
  // }

  async hide(id: number, userId: number) {
    await Promise.all([
      this.postsRepository.update({ id, userId, isHidden: true }),
      this.searchService.deletePost(id),
      this.clientCacheRepository.removePost(id)
    ]);
  }

  async expose(id: number, userId: number) {
    const post = await this.postsRepository.update({ id, userId, isHidden: false });
    await Promise.all([
      this.clientCacheRepository.addPost(id),
      this.searchService.indexPost(post)
    ]);
  }

  remove(input: RemovePostInputService) {
    return this.postsRepository.remove(input);
  }

  async recommendations(recommendationsInput: CurrentUserExtendT<FindAlgorithmPostsDto>) {
    const { userId, skipPages, ...data } = recommendationsInput;
    const { dislikedPosts, likedPosts, pressedPosts, recentlyShowedPosts } =
      (userId ? await this.preferencesService.get(userId, !skipPages) : {
        likedPosts: [],
        recentlyShowedPosts: [],
        dislikedPosts: [],
        pressedPosts: []
      });
    console.log("input", recommendationsInput);
    const { totalPages, data: elasticPosts } = await this.searchService.search({
      ...data,
      skipPages,
      likedPosts,
      dislikedPosts,
      pressedPosts,
      recentlyShowedPosts
    });
    if (userId)
      void this.preferencesService.setRecentlyShowed(userId, elasticPosts);
    const posts = await this.postsRepository.findMany({
      ids: elasticPosts.map(post => Number(post.id))
    });
    console.log("response", totalPages, posts);
    return {
      totalPages,
      data: posts
    };
  }


// removeMany(removeManyPostInput: PartialPostInput) {
//   return this.prismaService.post.deleteMany({ where: removeManyPostInput });
// }

}
