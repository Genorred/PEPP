import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsResolver } from './topics.resolver';
import { PrismaModule } from "../../domain/kernel/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [TopicsResolver, TopicsService],
})
export class TopicsModule {}
