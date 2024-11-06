import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from "../prisma/prisma.service";
import { PartialPostInput } from "./dto/partial-post.input";

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {
  }
  create(createPostInput: CreatePostInput) {
    return this.prismaService.post.create({data: createPostInput});
  }

  findMany(findManyPostInput: PartialPostInput) {
    return this.prismaService.post.findMany({where: findManyPostInput});
  }

  findOne(id: number) {
    return this.prismaService.post.findFirst({where: {id}});
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return this.prismaService.post.update({where: {id}, data: updatePostInput});
  }

  remove(id: number) {
    return this.prismaService.post.delete({where: {id}});
  }

  removeMany(removeManyPostInput: PartialPostInput) {
    return this.prismaService.post.deleteMany({where: removeManyPostInput});
  }
}
