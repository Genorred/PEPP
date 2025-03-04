import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prismaDb/prisma.service";
import { UpdatePostInputService } from "../../domain/dto/posts/update-post.dto";
import { RemovePostInputService } from "../../domain/dto/posts/remove-post.dto";
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
    console.log("input-xd", input);
    return this.prismaService.draft.delete({
      where: input
    });
  }

  async update(input: UpdatePostInputService): Promise<Draft> {
    const { id, topics, subTopics, userId, ...data } = input;
    let draft: Draft;

    draft = await this.prismaService.draft.update({
      where: { id, userId },
      data: {
        ...data,
        topics: topics?.length === 0 ? this.topicsRepository.resetTopics.topics : undefined,
        subTopics: topics?.length === 0 ? this.topicsRepository.resetTopics.subTopics : undefined
      }
    });
    if (topics?.length || subTopics?.length) {
      draft = await this.prismaService.draft.update({
        where: { id },
        data: {
          ...data,
          ...this.topicsRepository.connectOrCreate(topics, subTopics)
        }
      });
    }
    return draft;
  }
}