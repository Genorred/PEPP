import { Controller, Get } from "@nestjs/common";
import { HealthService } from "@_shared/modules/controller/health.service";
import { HealthCheck, HealthCheckResult } from "@nestjs/terminus";

@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {
  }

  @Get()
  @HealthCheck()
  check(): Promise<HealthCheckResult> {
    return this.healthService.checks();
  }
}