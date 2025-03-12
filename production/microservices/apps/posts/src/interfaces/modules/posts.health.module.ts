import { Module } from "@nestjs/common";
import { HealthModule } from "@_shared/modules/health.module";
import { HealthController } from "../controllers/health.controller";

@Module({
  imports: [HealthModule],
  controllers: [HealthController]
})
export class PostsHealthModule {
}
