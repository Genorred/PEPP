import { ConfigModule, ConfigService, ConfigType } from "@nestjs/config";
import {
  ApolloFederationDriver,
  ApolloFederationDriverConfig,
  ApolloGatewayDriver,
  ApolloGatewayDriverConfig
} from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import authConfig from "./config/authConfig";
import { AuthContext } from "./auth/auth.context";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import microservicesConfig from "./config/microservicesConfig";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig, microservicesConfig],
      expandVariables: true,
      cache: true,
      isGlobal: true
      // envFilePath: '../.env.local.local'
    }),JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [authConfig.KEY],
      useFactory: async (configService: ConfigType<typeof authConfig>) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: "60m" }
      })
    }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule, AuthModule],
      inject: [microservicesConfig.KEY, AuthContext],
      useFactory: (subgraphs: ConfigType<typeof microservicesConfig>, authContext: AuthContext) => {
        return {
          server: {
            context: ({ req }) => authContext.validate({ req }),
            // WARNING: IT IS USED TO RUN CONTAINERS ON LOW MEMORY PC SO THAT DEV CONTAINERS DON'T CONSUME ALL MEMORY
            introspection: true
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs
            }),
            buildService({ url }) {
              return new RemoteGraphQLDataSource({
                url,
                willSendRequest({ request, context }) {
                  request.http.headers.set(
                    "user",
                    context.user ? JSON.stringify(context.user) : null
                  );
                }
              });
            }
          }
        };
      }
    })
  ],
  providers: [AuthContext]
})

export class AppModule {
}