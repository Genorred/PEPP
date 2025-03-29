import { Injectable } from "@nestjs/common";
import { CommentsRepository } from "../../domain/repositories/comments/comments.repository";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { CreateCommentInput } from "../../domain/dto/comments/create-comment.input";
import { Comment } from "../../domain/entities/comment.entity";
import { PrismaService } from "./prismaDb/prisma.service";
import { CreateReplyInput } from "../../domain/dto/comments/create-reply.input";
import { Prisma } from ".prisma/client";
import { FindManyInput } from "../../domain/dto/comments/find-many.input";
import { UpdateCommentInput } from "../../domain/dto/comments/update-comment.input";
import { CountCommentsDto } from "../../domain/dto/comments/count-comments.dto";

@Injectable()
export class CommentsRepositoryImpl implements CommentsRepository {
  constructor(
    private readonly prismaService: PrismaService
  ) {
  }


  createReply(input: CurrentUserExtendT<CreateReplyInput>): Promise<Comment> {
    const { respondedCommentId, postId, parentId, ...data } = input;
    return this.prismaService.comment.create({
      data: {
        ...data,
        post: {
          connect: {
            id: postId
          }
        },
        parent: {
          connect: {
            id: parentId
          }
        },
        respondedCommentId
      }
    });
  }

  create(input: CurrentUserExtendT<CreateCommentInput>): Promise<Comment> {
    const { postId, ...data } = input;
    return this.prismaService.comment.create({
      data: {
        ...data,
        post: {
          connect: {
            id: postId
          }
        }
      }
    });
  }

  incrementRepliesQuantity(id: number): Promise<Comment> {
    return this.prismaService.comment.update({
      where: {
        id
      },
      data: {
        repliesQuantity: {
          increment: 1
        }
      }
    });
  }

  findOne(id: number): Promise<Comment> {
    return this.prismaService.comment.findFirst({
      where: { id }
    });
  }

  findMany(input: FindManyInput): Promise<Comment[]> {
    const { postId, userId, parentId, skipPages: skip, likes, repliesQuantity, dislikes, take, createdAt } = input;
    return this.prismaService.comment.findMany({
      where: {
        postId,
        userId,
        parentId
      },
      skip,
      take,
      orderBy: [{
        createdAt
      }, {
        likes
      }, {
        repliesQuantity
      }, {
        dislikes
      }] as Prisma.CommentOrderByWithRelationInput[]
    });
  }

  count(input: CountCommentsDto): Promise<number> {
    const { postId, userId, parentId } = input;
    return this.prismaService.comment.count({
      where: {
        postId,
        userId,
        parentId
      }
    });
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return this.prismaService.comment.update({
      where: { id: id },
      data: updateCommentInput
    });
  }

  remove(id: number) {
    return this.prismaService.comment.delete({
      where: { id: id }
    });
  }
}