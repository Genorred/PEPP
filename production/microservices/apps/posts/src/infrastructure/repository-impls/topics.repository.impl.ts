import { Injectable } from '@nestjs/common';
import { TopicsRepository } from '../../domain/repositories/topics/topics.repository';
import { Topic } from '../../domain/entities/topic.entity';
import { PrismaService } from './prismaDb/prisma.service';

// NO MORE THAN 5 TOPICS

@Injectable()
export class TopicsRepositoryImpl implements TopicsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(search: string): Promise<Topic[]> {
    return this.prismaService.topic.findMany({
      where: {
        title: search,
      },
    });
  }
}
