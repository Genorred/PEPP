import { Injectable } from "@nestjs/common";
import { CommentsRepository } from "../../domain/repositories/comments/comments.repository";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateCommentInput } from "../../domain/dto/comments/create-comment.input";
import { Comment } from "../../domain/entities/comment.entity";
import { PrismaService } from "../repositories/prismaDb/prisma.service";
import { CreateReplyInput } from "../../domain/dto/comments/create-reply.input";

@Injectable()
export class PostsRepositoryImpl implements CommentsRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) {
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
    })
  }

  findOne(id: number): Promise<Comment> {
    return this.prismaService.comment.findFirst({
      where: { id }
    });
  }

  create(input: CurrentUserExtendT<CreateCommentInput | CreateReplyInput>): Promise<Comment> {
    const { respondedCommentId, postId, parentId, ...data } = input;
    return this.prismaService.comment.create({
      data: {
        ...data,
        post: (postId ? {
          connect: {
            id: postId
          }
        } : undefined),
        parent: (parentId ? {
          connect: {
            id: parentId
          }
        } : undefined),
        respondedCommentId
      }
    });
  }
}