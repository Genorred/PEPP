import { Module } from '@nestjs/common';
import { HealthService } from './controller/health.service';
import { TerminusModule } from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TerminusModule.forRoot({
      errorLogStyle: 'pretty',
    }),
    HttpModule,
  ],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}
