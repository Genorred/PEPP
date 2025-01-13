import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreatePostInputService } from "../../domain/dto/posts/create-post.input";
import { UpdatePostInputService } from "../../domain/dto/posts/update-post.input";
import { PrismaService } from "../repositories/prismaDb/prisma.service";
import { PartialPostInput } from "../../domain/dto/posts/partial-post.input";
import { CreateVersionPostInputService } from "../../domain/dto/posts/create-version-post.input";
import { TopicsRepository } from "../repositories/prismaDb/topics/topics.repository";
import { FindPostInput } from "../../domain/dto/posts/find-post.input";
import { FindAlgorithmPostsInput } from "../../domain/dto/posts/find-algorithm-posts.input";
import { SearchService } from "../search/search.service";
import { PreferencesRepository } from "../repositories/redis/preferences.repository";
import {CurrentUserExtendT} from '@_shared/auth-guard/CurrentUserExtendT'
import { PublishPostInput } from "../../domain/dto/posts/publish-post.input";

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService,
              private readonly topicsRepository: TopicsRepository,
              private readonly searchService: SearchService,
              private readonly preferencesService: PreferencesRepository) {
  }

  async publish(createPostInput: CreatePostInputService) {
    const { topics, subTopics, ...data } = createPostInput;
    const post = await this.prismaService.post.create({
      data: {
        ...data,
        ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
      }
    });
    void this.searchService.indexPost(post);
    return post;
  }

  createDraft(createPostInput: CreatePostInputService) {
    const { topics, subTopics, ...data } = createPostInput;
    return this.prismaService.draft.create({
      data: {
        ...data,
        ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
      }
    });
  }
  async publishDraft(createPostInput: CurrentUserExtendT<PublishPostInput>) {
    const { topics, subTopics, id, ...data } = createPostInput;
    const draft = await this.prismaService.draft.findFirst({
      where: {
        id
      }
    })
    if (draft.version === 1) {
      return this.prismaService.post.create({
        data: {
          ...draft,
          ...data,
          ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
        }
      });
    } else {
      return this.prismaService.post.update({
        where: {
          id: draft.postId
        },
        data: {
          ...draft,
          ...data,
          ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
        }
      });
    }
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

  findMany(findManyPostInput: PartialPostInput & Parameters<typeof this.prismaService.post.findMany>["0"]["where"]) {
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

  async recommendations(recommendationsInput: FindAlgorithmPostsInput & { userId?: number }) {
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
    const posts = await this.findMany({
      id: {
        in: elasticPosts.map(post => Number(post.id))
      }
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
