import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCommentInput } from "./dto/create-comment.input";
import { UpdateCommentInput } from "./dto/update-comment.input";
import { PrismaService } from "../../domain/kernel/prisma/prisma.service";
import { GetByPostInput } from "./dto/get-by-post.input";
import { CommentsByPost } from "./model/recommendations.response";
import { Prisma } from ".prisma/client";
import { GetByParentCommentInput } from "./dto/get-by-parent-comment.input";

const page = 20;

@Injectable()
export class CommentsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  async create({ userId, message, parentId, postId, respondedCommentId }: CreateCommentInput & { userId: number }) {
    const post = await this.prismaService.post.findFirst({
      where: { id: postId }
    });
    if (!post) {
      throw new NotFoundException("Post not found");
    }
    const query = {
      data: {
        userId,
        postVersion: post.version,
        message,
        post: (postId ? {
          connect: {
            id: postId
          }
        } : undefined),
        parent: (parentId ? {
          connect: {
            id: parentId
          }
        } : undefined)
      }
    } as const;
    const postUpdate = this.prismaService.post.update({
      where: {
        id: postId
      },
      data: {
        commentsQuantity: {
          increment: 1
        }
      }
    })
    if (parentId) {
      const [comment, respondedComment] = await this.prismaService.$transaction([
        this.prismaService.comment.create({
          data: {
            ...query.data,
            respondedCommentId
          }
        }),
        this.prismaService.comment.update({
          where: {
            id: parentId
          },
          data: {
            repliesQuantity: {
              increment: 1
            }
          }
        }),
        postUpdate
      ]);
      return comment;
    } else {
      const [comment, post] = await this.prismaService.$transaction([
        this.prismaService.comment.create(query),
        postUpdate
      ])
      return comment;
    }

  }

  async getByPost(getByPostInput: GetByPostInput): Promise<CommentsByPost> {
    const query = {
      where: {
        postId: getByPostInput.postId,
        parentId: null
      }
    } as const;
    const [data, totalCount] = await this.prismaService.$transaction([
      this.prismaService.comment.findMany({
        ...query,
        skip: getByPostInput.skipPages,
        take: 20,
        orderBy: [{
          likes: "asc"
        }, {
          repliesQuantity: "asc"
        }, {
          dislikes: "desc"
        }] as Prisma.CommentOrderByWithRelationInput[]
      }),
      this.prismaService.comment.count(query)
    ]);
    console.log(data);
    return {
      data,
      totalPages: Math.max(Math.floor(totalCount / page), 1)
    };
  }

  async getByParentComment(getByParentCommentInput: GetByParentCommentInput) {
    const query = {
      where: {
        parentId: getByParentCommentInput.parentId
      }
    } as const;
    const [data, totalCount] = await this.prismaService.$transaction([
      this.prismaService.comment.findMany({
        ...query,
        skip: getByParentCommentInput.skipPages,
        take: page
      }),
      this.prismaService.comment.count(query)
    ]);
    return {
      data,
      totalPages: Math.max(Math.floor(totalCount / page), 1)
    };
  }

  findOne(id: number) {
    return this.prismaService.comment.findFirst({
      where: { id: id }
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
