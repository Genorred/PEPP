import {
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

export class PostsHealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator,
  ) {}

  async checks(): Promise<HealthCheckResult> {
    return this.health.check([]);
  }
}
