import { ForbiddenException, Injectable } from "@nestjs/common";
import { CreatePostInput, CreatePostInputService } from "./dto/create-post.input";
import { UpdatePostInput, UpdatePostInputService } from "./dto/update-post.input";
import { PrismaService } from "../prisma/prisma.service";
import { PartialPostInput } from "./dto/partial-post.input";
import { JwtPayload } from "@shared/entities/jwt.entity";
import { CreateVersionPostInputService } from "./dto/create-version-post.input";
import { TopicsRepository } from "./topics.repository";
import { FindPostInput } from "./dto/find-post.input";

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService,
              private readonly topicsRepository: TopicsRepository) {
  }

  create(createPostInput: CreatePostInputService) {
    const { topics, subTopics, isPublished, ...data } = createPostInput;
    return this.prismaService.post.create({
      data: {
        ...data,
        isPublished: !data?.isDraft && isPublished, // draft can't be published
        ...this.topicsRepository.connectOrCreateTopics(topics, subTopics)
      }
    });
  }

  async createVersion(createVersionPostInput: CreateVersionPostInputService) {
    const actualPost = await this.findOne({ id: createVersionPostInput.postId });

    if (actualPost.userId === createVersionPostInput.userId) {
      const { topics, subTopics, userId, postId, ...data } = createVersionPostInput;
      if (data.isPublished) { // create post of current version, make it archived and copy new data to main post
        await this.prismaService.post.update({
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

  findMany(findManyPostInput: PartialPostInput) {
    const { topics, subTopics, ...other } = findManyPostInput;
    const where: Parameters<typeof this.prismaService.post.findMany>['0']['where'] = {...other}
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
      })) : [])]
    return this.prismaService.post.findMany({
      where: {
        ...where,
      }, include: {
        topics: true,
        subTopics: true
      }
    });
  }

  findOne(findOneInput: FindPostInput & { isDraft?: boolean }) {
    return this.prismaService.post.findFirst({ where: findOneInput });
  }

  update(updatePostInput: UpdatePostInputService) {
    const { id, userId, topics, subTopics, isPublished, ...body } = updatePostInput;
    let where = { id, userId };
    if (isPublished) {
      body.isDraft = false
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
    return this.prismaService.post.update({
      where, data: {
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


  async publishVersion(postId: number, userId: number) {
    const versionPost = await this.findOne({ id: postId });
    const actualPost = await this.prismaService.post.findFirst({
      where: { id: versionPost.id },
      include: { topics: { select: { title: true } }, subTopics: { select: { title: true } } }
    });

    if (actualPost.userId === userId) {
      const { topics, subTopics, userId, postId, id, ...data } = actualPost;
      await this.prismaService.post.update({
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

      return this.prismaService.post.update({
        where: {
          id: versionPost.id
        },
        data: {
          ...data,
          isArchived: true
        }
      });
    }
  }

  remove(id: number) {
    return this.prismaService.post.delete({ where: { id } });
  }

// removeMany(removeManyPostInput: PartialPostInput) {
//   return this.prismaService.post.deleteMany({ where: removeManyPostInput });
// }

}
