import { Module } from "@nestjs/common";
import { TopicsService } from "../../infrastructure/topics/topics.service";
import { TopicsResolver } from "../resolvers/topics.resolver";
import { PrismaModule } from "../prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [TopicsResolver, TopicsService]
})
export class TopicsModule {
}
