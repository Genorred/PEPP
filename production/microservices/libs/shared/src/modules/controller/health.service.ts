import { Injectable } from "@nestjs/common";
import { HealthCheckService, HttpHealthIndicator } from "@nestjs/terminus";

@Injectable()
export class HealthService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly http: HttpHealthIndicator
  ) {
  }

  public async checks() {
    return this.health.check([
      async () =>
        this.http.pingCheck("graphql", "http://localhost:8080/graphql/.well-known/apollo/server-health", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify({
            query: "{ __typename }" // A simple valid GraphQL query
          })
        })
    ]);
  }
}