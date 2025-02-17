import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import JSON from "graphql-type-json";
import { User } from "../../domain/entities/user.entity";
import { HealthModule } from "@_shared/modules/health.module";
import { HealthController } from "../controllers/health.controller";

@Module({
  imports: [HealthModule],
  controllers: [HealthController]
})
export class PostsHealthModule {
}
