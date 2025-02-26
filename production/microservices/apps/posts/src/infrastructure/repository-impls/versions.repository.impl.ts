import { Args } from "@nestjs/graphql";
import { VersionsRepository } from "../../domain/repositories/versions/versions.repository";
import { PrismaService } from "./prismaDb/prisma.service";
import { Version } from "../../domain/entities/version.entity";
import { FindOneVersionDto } from "../../domain/dto/versions/find-one-version.dto";
import { FindManyDto } from "../../domain/dto/versions/find-many.dto";
import { CreateVersionDto } from "../../domain/dto/versions/create-version.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class VersionsRepositoryImpl implements VersionsRepository {
  constructor(private  readonly prismaService: PrismaService) {
  }

  create(createVersionInput: CreateVersionDto): Promise<Version> {
    const { postId, version, userId, title, description, body } = createVersionInput
    return this.prismaService.version.create({
      data: {
        actualPost: {
          connect: {
            id: postId
          }
        },
        title,
        description,
        body,
        version,
        userId,
      }
    })
  }

  findMany(findByPostInput: FindManyDto ): Promise<Version[]> {
    const {postId, userId } = findByPostInput
    return this.prismaService.version.findMany({
      where: {
        postId,
        userId
      }
    })
  }

  findOne(findOneVersion: FindOneVersionDto): Promise<Version> {
    const {id} = findOneVersion
    return this.prismaService.version.findFirst({
      where: {
        id
      }
    })

  }
}