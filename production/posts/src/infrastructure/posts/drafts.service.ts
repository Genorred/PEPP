import { Injectable } from "@nestjs/common";
import { CreatePostInputService } from "../../domain/dto/posts/create-post.input";
import { PrismaService } from "../repositories/prismaDb/prisma.service";
import { PartialPostInput } from "../../domain/dto/posts/partial-post.input";
import { TopicsRepository } from "../repositories/prismaDb/topics/topics.repository";
import { FindPostInput } from "../../domain/dto/posts/find-post.input";
import { CurrentUserExtendT } from "@_shared/auth-guard/CurrentUserExtendT";
import { PublishPostInput } from "../../domain/dto/posts/publish-post.input";
import { UpdatePostInput } from "../../domain/dto/posts/update-post.input";

@Injectable()
export class DraftsService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly topicsRepository: TopicsRepository
  ) {
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
    });

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

  update(updatePostInput: CurrentUserExtendT<UpdatePostInput>) {
    const { id, userId, topics, subTopics, ...body } = updatePostInput;
    return this.prismaService.draft.update({
      where: {
        id,
        userId
      }, data: {
        ...body,
        ...this.topicsRepository.resetTopics(topics, subTopics)
      }
    });
  }

  delete(id: number) {
    return this.prismaService.draft.delete({ where: { id } });
  }
}
