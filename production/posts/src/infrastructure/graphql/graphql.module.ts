import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloFederationDriver, ApolloFederationDriverConfig } from "@nestjs/apollo";
import JSON from "graphql-type-json";
import { User } from "../../domain/entities/user.entity";

@Module({
  imports: [GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver: ApolloFederationDriver,
    autoSchemaFile: {
      federation: 2
    },
    resolvers: { JSON },
    buildSchemaOptions: {
      orphanedTypes: [User]
    }
  })]
})
export class GraphQLModuleInitializer {
}