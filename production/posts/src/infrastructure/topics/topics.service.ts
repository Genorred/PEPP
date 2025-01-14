import { Injectable } from "@nestjs/common";
import { PrismaService } from "../repositories/prismaDb/prisma.service";

@Injectable()
export class TopicsService {
  constructor(private readonly prismaService: PrismaService) {
  }

  // create(createTopicInput: CreateTopicInput) {
  //   return 'This action adds a new topic';
  // }

  findAll(title: string) {
    return this.prismaService.topic.findMany({ where: { title: { contains: title } }, take: 8 });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} topic`;
  // }

  // update(id: number, updateTopicInput: UpdateTopicInput) {
  //   return `This action updates a #${id} topic`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} topic`;
  // }
}
