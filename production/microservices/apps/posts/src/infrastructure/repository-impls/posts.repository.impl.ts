import { Injectable } from "@nestjs/common";
import { CommentsRepository } from "../../domain/repositories/comments/comments.repository";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateCommentInput } from "../../domain/dto/comments/create-comment.input";
import { Comment } from "../../domain/entities/comment.entity";
import { PrismaService } from "./prismaDb/prisma.service";
import { CreateReplyInput } from "../../domain/dto/comments/create-reply.input";
import { PostsRepository } from "../../domain/repositories/posts/posts.repository";
import { CreatePostInput, CreatePostInputService } from "../../domain/dto/posts/create-post.input";
import { UpdatePostInput } from "../../domain/dto/posts/update-post.input";
import { TopicsRepositoryImpl } from "./topics.repository.impl";
import { Post } from "../../domain/entities/post.entity";
import { FindManyInput } from "../../domain/dto/posts/find-many.input";
import { FindPostInput, FindPostInputService } from "../../domain/dto/posts/find-post.input";
import { RemovePostInputService } from "../../domain/dto/posts/remove-post.input";
import { TopicsPrismaRepository } from "./topics.prisma.repository";
import { SearchRepository } from "../../domain/repositories/posts/search.repository";

@Injectable()
export class PostsRepositoryImpl implements PostsRepository {
  constructor(
    private readonly topicsRepository: TopicsPrismaRepository,
    private readonly prismaService: PrismaService,
  ) {
  }

  create(input: CreatePostInputService): Promise<Post> {
    const { topics, subTopics, ...data } = input;
    return this.prismaService.post.create({
      data: {
        ...data,
        ...this.topicsRepository.connectOrCreate(topics, subTopics)
      }
    });
  }

  incrementComments(postId: number) {
    return this.prismaService.post.update({
      where: {
        id: postId
      },
      data: {
        commentsQuantity: {
          increment: 1
        }
      }
    });
  }

  findOne(input: FindPostInput): Promise<Post> {
    return this.prismaService.post.findFirst({
      where: input,
      include: {
        topics: true,
        subTopics: true
      }
    });
  }

  findMany(input: FindManyInput): Promise<Post[]> {
    const { ids, id, take, skip, ...rest } = input;
    return this.prismaService.post.findMany({
      where: {
        id: ids ? {
          in: ids
        } : id,
        ...rest
      },
      take,
      skip
    });
  }

  count(input: FindManyInput): Promise<number> {
    const { ids, id, take, skip, ...rest } = input;
    return this.prismaService.post.count({
      where: {
        id: ids ? {
          in: ids
        } : id,
        ...rest
      }
    });
  }

  async getCommentsQuantity(postId: number): Promise<number> {
    return (await this.prismaService.post.findFirst({
      where: {
        id: postId
      },
      select: {
        commentsQuantity: true
      }
    })).commentsQuantity;
  }

  async update(input: CurrentUserExtendT<UpdatePostInput>): Promise<Post> {
    const { id, topics, subTopics, ...data } = input;
    let post: Post
    console.log({
      ...data,
      topics: topics ? this.topicsRepository.resetTopics.topics : undefined,
      subTopics: subTopics ? this.topicsRepository.resetTopics.subTopics : undefined,
    },{
        ...data,
        ...this.topicsRepository.connectOrCreate(topics, subTopics)
      }
      );
    post = await this.prismaService.post.update({
      where: { id },
      data: {
        ...data,
        topics: topics ? this.topicsRepository.resetTopics.topics : undefined,
        subTopics: subTopics ? this.topicsRepository.resetTopics.subTopics : undefined,
      }
    });
    if (topics?.length || subTopics?.length) {
      post = await this.prismaService.post.update({
        where: { id },
        data: {
          ...data,
          ...this.topicsRepository.connectOrCreate(topics, subTopics)
        }
      });
    }
    return post
  }

  remove(input: RemovePostInputService): Promise<Post> {
    return this.prismaService.post.delete({
      where: input
    });
  }
}