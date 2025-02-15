import { Module } from '@nestjs/common';
import { HealthController } from './controller/health.controller';
import { TerminusModule } from "@nestjs/terminus";

@Module({
  controllers: [HealthController],
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
  ]
})
export class HealthModule {}
