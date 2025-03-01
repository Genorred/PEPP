import { Injectable } from "@nestjs/common";
import { CommentsRepository } from "../../domain/repositories/comments/comments.repository";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateCommentInput } from "../../domain/dto/comments/create-comment.input";
import { Comment } from "../../domain/entities/comment.entity";
import { PrismaService } from "./prismaDb/prisma.service";
import { CreateReplyInput } from "../../domain/dto/comments/create-reply.input";
import { PostsRepository } from "../../domain/repositories/posts/posts.repository";
import { CreatePostDto, CreatePostServiceDto } from "../../domain/dto/posts/create-post.dto";
import { UpdatePostDto } from "../../domain/dto/posts/update-post.dto";
import { TopicsRepositoryImpl } from "./topics.repository.impl";
import { Post } from "../../domain/entities/post.entity";
import { FindManyDto } from "../../domain/dto/posts/find-many.dto";
import { FindPostDto, FindPostInputService } from "../../domain/dto/posts/find-post.dto";
import { RemovePostInputService } from "../../domain/dto/posts/remove-post.dto";
import { TopicsPrismaRepository } from "./topics.prisma.repository";
import { SearchRepository } from "../../domain/repositories/posts/search.repository";
import { DMMF } from "@prisma/client/runtime/library";
import SortOrder = DMMF.SortOrder;

@Injectable()
export class PostsRepositoryImpl implements PostsRepository {
  constructor(
    private readonly topicsRepository: TopicsPrismaRepository,
    private readonly prismaService: PrismaService
  ) {
  }

  create(input: CreatePostServiceDto): Promise<Post> {
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

  findOne(input: FindPostDto): Promise<Post> {
    return this.prismaService.post.findFirst({
      where: input,
      include: {
        topics: true,
        subTopics: true
      }
    });
  }

  findMany(input: FindManyDto): Promise<Post[]> {
    const { ids, id, take, skip, topics, subTopics, topicsOrSubTopics, rating, createdAt, ...rest } = input;
    return this.prismaService.post.findMany(
      {
        orderBy: {
          rating: rating?.toLowerCase() as SortOrder,
          createdAt:createdAt?.toLowerCase() as SortOrder
        },
        ...this._findPostsParams(input),
        include: {
          topics: true,
          subTopics: true
        }
      }
    )
  }

  count(input: FindManyDto): Promise<number> {
    return this.prismaService.post.count(
      this._findPostsParams(input)
    );
  }

  _findPostsParams(input: FindManyDto) {
    const { ids, id, take, skip, topics, subTopics, topicsOrSubTopics, rating, createdAt, ...rest } = input;
    return {
      where: {
        id: ids ? {
          in: ids
        } : id,
        AND: topicsOrSubTopics?.length && topicsOrSubTopics.map(title => ({
          OR: [
            {
              topics: {
                some: {
                  title
                }
              }
            }, {
              subTopics: {
                some: {
                  title
                }
              }
            }
          ]
        })),
        topics: topics?.length ? {
          some: {
            AND: topics?.map(title => ({ title }))
          }
        } : undefined,
        subTopics: subTopics?.length ? {
          some: {
            AND: subTopics?.map(title => ({ title }))
          }
        } : undefined,
        ...rest
      },
      take,
      skip
    } as const;
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

  async update(input: CurrentUserExtendT<UpdatePostDto>): Promise<Post> {
    const { id, topics, subTopics, ...data } = input;
    let post: Post;
    console.log({
        ...data,
        topics: topics ? this.topicsRepository.resetTopics.topics : undefined,
        subTopics: subTopics ? this.topicsRepository.resetTopics.subTopics : undefined
      }, {
        ...data,
        ...this.topicsRepository.connectOrCreate(topics, subTopics)
      }
    );
    post = await this.prismaService.post.update({
      where: { id },
      data: {
        ...data,
        topics: topics ? this.topicsRepository.resetTopics.topics : undefined,
        subTopics: subTopics ? this.topicsRepository.resetTopics.subTopics : undefined
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
    return post;
  }

  remove(input: RemovePostInputService): Promise<Post> {
    return this.prismaService.post.delete({
      where: input
    });
  }
}