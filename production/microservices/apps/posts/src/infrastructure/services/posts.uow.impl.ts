import { PostsUow } from "../../domain/repositories/UoW/posts.uow";
import { PostsRepository } from "../../domain/repositories/posts/posts.repository";
import { VersionsRepository } from "../../domain/repositories/versions/versions.repository";
import { PostsRepositoryImpl } from "../repository-impls/posts.repository.impl";
import { PrismaService } from "../repository-impls/prismaDb/prisma.service";
import { TopicsPrismaRepository } from "../repository-impls/topics.prisma.repository";
import { VersionsRepositoryImpl } from "../repository-impls/versions.repository.impl";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PostsUowImpl implements PostsUow {
  constructor(private readonly prismaService: PrismaService) {
  }

  run<T>(callback: (repos: {
    postsRepository: PostsRepository;
    versionsRepository: VersionsRepository
  }) => Promise<T>): Promise<T> {

    return this.prismaService.$transaction((tx) => {

      return callback({
        postsRepository: new PostsRepositoryImpl(new TopicsPrismaRepository(), tx as PrismaService),
        versionsRepository: new VersionsRepositoryImpl(tx as PrismaService)
      });
    });
  }
}