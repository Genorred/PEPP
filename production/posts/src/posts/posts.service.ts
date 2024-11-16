import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreatePostInput, CreatePostInputService } from "./dto/create-post.input";
import { UpdatePostInput, UpdatePostInputService } from "./dto/update-post.input";
import { PrismaService } from "../prisma/prisma.service";
import { PartialPostInput } from "./dto/partial-post.input";
import { JwtPayload } from "@shared/entities/jwt.entity";
import { CreateVersionPostInputService } from "./dto/create-version-post.input";
import { TopicsRepository } from "./topics.repository";

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService,
              private readonly topicsRepository: TopicsRepository,) {
  }

  create(createPostInput: CreatePostInputService) {
    const { topics, subTopics, ...data } = createPostInput;
    return this.prismaService.post.create({
      data: {
        ...data,
        ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
      }
    });
  }

  async createVersion(createVersionPostInput: CreateVersionPostInputService) {
    const actualPost = await this.findOne(createVersionPostInput.postId);

    if (actualPost.userId === createVersionPostInput.userId) {
      const { topics, subTopics, userId, ...data } = createVersionPostInput;
      if (data.published) { // create post of current version, make it archived and copy new data to main post
        this.prismaService.post.update({
          where: {
            id: actualPost.id
          },
          data: {
            ...data,
            version: actualPost.version + 1,
            ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
          }
        });

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
            version: actualPost.version + 1,
            ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
          }
        });
      }
    } else {
      throw new ForbiddenException();
    }
  }

  findMany(findManyPostInput: PartialPostInput) {
    const { topics, subTopics, ...where } = findManyPostInput;
    return this.prismaService.post.findMany({
      where: {
        ...where,
        AND: [
          ...topics.map(title => ({
            topics: {
              some: {
                title
              }
            }
          })),
          ...subTopics.map(title => ({
            subTopics: {
              some: {
                title
              }
            }
          }))]
      }, include: {
        topics: true
      }
    });
  }

  findOne(id: number, published: boolean = true) {
    return this.prismaService.post.findFirst({ where: { id, published } });
  }

  update(updatePostInput: UpdatePostInputService) {
    const { id, userId, topics, subTopics, ...body } = updatePostInput;
    const connectOrCreateTopicsData = this.topicsRepository.connectOrCreateTopics(topics, subTopics);
    return this.prismaService.post.update({
      where: { id, userId }, data: {
        ...body,
        topics: {
          set: [],
          ...connectOrCreateTopicsData.topics
        },
        subTopics: {
          set: [],
          ...connectOrCreateTopicsData.subTopics
        }
      }
    });
  }

  publish(postId: number, userId: number) {
    return this.prismaService.post.update({ where: { id: postId }, data: { published: true } });
  }

  remove(id: number) {
    return this.prismaService.post.delete({ where: { id } });
  }

  // removeMany(removeManyPostInput: PartialPostInput) {
  //   return this.prismaService.post.deleteMany({ where: removeManyPostInput });
  // }

}
