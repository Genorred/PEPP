import { ConfigModule, ConfigType } from "@nestjs/config";
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { IntrospectAndCompose, RemoteGraphQLDataSource } from "@apollo/gateway";
import authConfig from "./config/authConfig";
import { AuthContext } from "./auth/auth.context";
import { AuthModule } from "./auth/auth.module";
import { JwtModule } from "@nestjs/jwt";
import microservicesConfig from "./config/microservicesConfig";
import redisConfig from "./config/redis.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig, microservicesConfig, redisConfig],
      expandVariables: true,
      cache: true,
      isGlobal: true
      // envFilePath: '../.env.local.local'
    }), JwtModule.registerAsync({
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
            context: ({ req, res }) => authContext.validate({ req, res }),
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs,
              subgraphHealthCheck: true,
              pollIntervalInMs: 5000
            }),
            buildService({ url }) {
              return new RemoteGraphQLDataSource({
                url,
                willSendRequest({ request, context }) {
                  request.http.headers.set('cookies',
                    context?.cookies ? JSON.stringify(context.cookies) : null)
                  request.http.headers.set(
                    "user",
                    context?.user ? JSON.stringify(context.user) : null
                  );
                },
                didReceiveResponse({response, context}){
                  // @ts-ignore
                  const cookies = response.http.headers?.raw()['set-cookie'] as string[]
                  if (cookies) {
                    context?.req.res.append('set-cookie', cookies)
                  }
                  return response
                }
              });
            },
          }
        };
      }
    })
  ],
  providers: [AuthContext]
})

export class AppModule {
}