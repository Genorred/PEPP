import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreatePostInputService } from "./dto/create-post.input";
import { UpdatePostInputService } from "./dto/update-post.input";
import { PrismaService } from "../../domain/kernel/prisma/prisma.service";
import { PartialPostInput } from "./dto/partial-post.input";
import { CreateVersionPostInputService } from "./dto/create-version-post.input";
import { TopicsRepository } from "../../domain/repositories/db/topics.repository";
import { FindPostInput } from "./dto/find-post.input";
import { FindAlgorithmPostsInput } from "./dto/find-algorithm-posts.input";
import { SearchService } from "../search/search.service";
import { PreferencesRepository } from "../../domain/repositories/elastic/preferences.repository";
import { Post } from "../../domain/entities/post.entity";

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService,
              private readonly topicsRepository: TopicsRepository,
              private readonly searchService: SearchService,
              private readonly preferencesService: PreferencesRepository) {
  }

  async create(createPostInput: CreatePostInputService) {
    const { topics, subTopics, isPublished, ...data } = createPostInput;
    const post = await this.prismaService.post.create({
      data: {
        ...data,
        isPublished: !data?.isDraft && isPublished, // draft can't be published
        ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
      }
    });
    if (isPublished) {
      void this.searchService.indexPost(post);
    }
    return post;
  }

  async createVersion(createVersionPostInput: CreateVersionPostInputService) {
    const { id, topics, subTopics, ...actualPost } = await this.findOne({ id: createVersionPostInput.postId });

    if (actualPost.userId === createVersionPostInput.userId) {
      const { topics, subTopics, userId, postId, ...data } = createVersionPostInput;
      if (data.isPublished) { // create post of current version, make it archived and copy new data to main post
        const post = await this.prismaService.post.update({
          where: {
            id
          },
          data: {
            ...data,
            version: actualPost.version + 1,
            ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
          }
        });
        void this.searchService.updatePost(post);

        return this.prismaService.post.create({
          data: {
            ...actualPost,
            isArchived: true
          }
        });

      } else { // just create draft version of post
        return this.prismaService.post.create({
          data: {
            ...actualPost,
            ...data,
            isDraft: true,
            version: actualPost.version + 1,
            ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
          }
        });
      }
    } else {
      throw new ForbiddenException();
    }
  }

  findMany(findManyPostInput: PartialPostInput & Parameters<typeof this.prismaService.post.findMany>['0']['where']) {
    const { topics, subTopics, ...other } = findManyPostInput;
    const where: Parameters<typeof this.prismaService.post.findMany>["0"]["where"] = { ...other };
    where.AND = [
      ...(topics?.length ? topics.map(title => ({
        topics: {
          some: {
            title
          }
        }
      })) : []),
      ...(subTopics?.length ? subTopics.map(title => ({
        subTopics: {
          some: {
            title
          }
        }
      })) : [])];
    return this.prismaService.post.findMany({
      where: {
        ...where
      }, include: {
        topics: true,
        subTopics: true
      }
    });
  }

  findOne(findOneInput: FindPostInput & { isDraft?: boolean }) {
    return this.prismaService.post.findFirst({
      where: findOneInput, include: {
        topics: true,
        subTopics: true
      }
    });
  }

  async update(updatePostInput: UpdatePostInputService) {
    const { id, userId, topics, subTopics, isPublished, ...body } = updatePostInput;
    let where = { id, userId };
    if (isPublished) {
      body.isDraft = false;
      where = {
        ...where,
        // @ts-ignore
        OR: [{ // omitting version post draft
          isDraft: true,
          version: 1
        }, {
          isDraft: false
        }]
      };
    }
    const connectOrCreateTopicsData = this.topicsRepository.connectOrCreateTopics(topics, subTopics);
    const post = await this.prismaService.post.update({
      where, data: {
        ...body,
        topics: (connectOrCreateTopicsData.topics ? {
          set: [],
          ...connectOrCreateTopicsData.topics
        } : {}),
        subTopics: (connectOrCreateTopicsData.subTopics ? {
          set: [],
          ...connectOrCreateTopicsData.subTopics
        } : {})
      }
    });
    if (isPublished) {
      void this.searchService.indexPost(post);
    } else if (isPublished === false) {
      void this.searchService.deletePost(post.id);
    }
    return post;
  }


  async publishVersion(postId: number, userId: number) {
    const versionPost = await this.findOne({ id: postId });
    const actualPost = await this.prismaService.post.findFirst({
      where: { id: versionPost.id },
      include: { topics: { select: { title: true } }, subTopics: { select: { title: true } } }
    });

    if (actualPost.userId === userId) {
      const { topics, subTopics, userId, postId, id, ...data } = actualPost;
      const post = await this.prismaService.post.update({
        where: {
          id
        },
        data: {
          ...data,
          isDraft: false,
          version: actualPost.version + 1,
          ...this.topicsRepository.connectOrCreateTopics(topics.map(topic => topic.title), subTopics.map(topic => topic.title))
        }
      });

      await this.prismaService.post.update({
        where: {
          id: versionPost.id
        },
        data: {
          ...data,
          isArchived: true
        }
      });
      void this.searchService.indexPost(post);
      return post;
    }
  }

  remove(id: number) {
    return this.prismaService.post.delete({ where: { id } });
  }

  async recommendations(recommendationsInput: FindAlgorithmPostsInput & { userId: number }) {
    const { userId, skipPages, ...data } = recommendationsInput;
    const { dislikedPosts, likedPosts, pressedPosts, recentlyShowedPosts } =
      await this.preferencesService.get(userId, !skipPages);
    console.log("input", recommendationsInput);
    const { totalPages, data: elasticPosts } = await this.searchService.search({
      ...data,
      skipPages,
      likedPosts,
      dislikedPosts,
      pressedPosts,
      recentlyShowedPosts
    });
    void this.preferencesService.setRecentlyShowed(userId, elasticPosts);
    const posts = await this.findMany({id: {
      in: elasticPosts.map(post => Number(post.id))
      }})
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
