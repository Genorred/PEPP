import { Injectable } from "@nestjs/common";
import { CommentsRepository } from "../../domain/repositories/comments/comments.repository";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateCommentInput } from "../../domain/dto/comments/create-comment.input";
import { Comment } from "../../domain/entities/comment.entity";
import { PrismaService } from "./prismaDb/prisma.service";
import { CreateReplyInput } from "../../domain/dto/comments/create-reply.input";
import { PostsRepository } from "../../domain/repositories/posts/posts.repository";
import { CreatePostInput, CreatePostInputService } from "../../domain/dto/posts/create-post.input";
import { UpdatePostInput, UpdatePostInputService } from "../../domain/dto/posts/update-post.input";
import { TopicsRepositoryImpl } from "./topics.repository.impl";
import { Post } from "../../domain/entities/post.entity";
import { FindManyInput } from "../../domain/dto/posts/find-many.input";
import { FindPostInput, FindPostInputService } from "../../domain/dto/posts/find-post.input";
import { RemovePostInputService } from "../../domain/dto/posts/remove-post.input";
import { DraftsRepository } from "../../domain/repositories/drafts/drafts.repository";
import { CreateDraftInputService } from "../../domain/dto/drafts/create-draft.input";
import { Draft } from "../../domain/entities/draft.entity";
import { FindDraftInputService } from "../../domain/dto/drafts/find-draft.input";
import { FindManyDraftsInput } from "../../domain/dto/drafts/find-many-drafts.input";
import { TopicsPrismaRepository } from "./topics.prisma.repository";

@Injectable()
export class DraftsRepositoryImpl implements DraftsRepository {
  constructor(
    private readonly topicsRepository: TopicsPrismaRepository,
    private readonly prismaService: PrismaService
  ) {
  }

  create(input: CreateDraftInputService): Promise<Draft> {
    const { topics, subTopics, ...data } = input;
    return this.prismaService.draft.create({
      data: {
        ...data,
        ...this.topicsRepository.connectOrCreate(topics, subTopics)
      }
    });
  }

  findOne(input: FindDraftInputService): Promise<Draft> {
    return this.prismaService.draft.findFirst({
      where: input
    });
  }

  findMany(input?: FindManyDraftsInput): Promise<Draft[]> {
    const { id, ...rest } = input;
    return this.prismaService.draft.findMany({
      where: input
    });
  }

  remove(input: RemovePostInputService): Promise<Draft> {
    return this.prismaService.draft.delete({
      where: input
    });
  }

  update(input: UpdatePostInputService): Promise<Draft> {
    const { id, topics, subTopics, userId, ...data } = input;
    return this.prismaService.draft.update({
      where: { id, userId },
      data: {
        ...data,
        ...this.topicsRepository.resetTopics(topics, subTopics)
      }
    });
  }
}