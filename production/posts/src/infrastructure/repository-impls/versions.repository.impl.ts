import { Args } from "@nestjs/graphql";
import { VersionsRepository } from "../../domain/repositories/versions/versions.repository";
import { PrismaService } from "./prismaDb/prisma.service";
import { Version } from "../../domain/entities/version.entity";
import { FindOneVersionInput } from "../../domain/dto/versions/find-one-version.input";
import { FindManyInput } from "../../domain/dto/versions/find-many.input";
import { CreateVersionInput } from "../../domain/dto/versions/create-version.input";

export class VersionsRepositoryImpl implements VersionsRepository {
  constructor(private  readonly prismaService: PrismaService) {
  }

  create(createVersionInput: CreateVersionInput): Promise<Version> {
    return this.prismaService.version.create({
      data: createVersionInput
    })
  }

  findMany(findByPostInput: FindManyInput ): Promise<Version[]> {
    const {postId, userId } = findByPostInput
    return this.prismaService.version.findMany({
      where: {
        postId,
        userId
      }
    })
  }

  findOne(findOneVersion: FindOneVersionInput): Promise<Version> {
    const {id} = findOneVersion
    return this.prismaService.version.findFirst({
      where: {
        id
      }
    })

  }
}