import { Module } from '@nestjs/common';
import { TopicsUseCase } from '../../application/topics.use-case';
import { TopicsResolver } from '../resolvers/topics.resolver';
import { PrismaModule } from '../prisma.module';
import { TopicsRepository } from '../../domain/repositories/topics/topics.repository';
import { TopicsRepositoryImpl } from '../../infrastructure/repository-impls/topics.repository.impl';
import { TopicsPrismaRepository } from '../../infrastructure/repository-impls/topics.prisma.repository';

@Module({
  imports: [PrismaModule],
  providers: [
    TopicsResolver,
    TopicsUseCase,
    {
      provide: TopicsRepository,
      useClass: TopicsRepositoryImpl,
    },
    TopicsPrismaRepository,
  ],
  exports: [TopicsPrismaRepository],
})
export class TopicsModule {}
