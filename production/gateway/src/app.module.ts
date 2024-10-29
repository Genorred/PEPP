import { ConfigModule, ConfigService } from "@nestjs/config";
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
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./consts";
import { AuthContext } from "./config/auth.context";
import { AuthModule } from "./config/auth.module";

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "60000s" }
    }),
    ConfigModule.forRoot({
      load: [authConfig],
      expandVariables: true,
      cache: true,
      isGlobal: true
      // envFilePath: '../.env.local.local'
    }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      imports: [ConfigModule, AuthModule,

        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '60000s' },

        })
      ],
      inject: [ConfigService, AuthContext],
      useFactory: (config: ApolloGatewayDriverConfig, authContext: AuthContext) => {
        return {
          server: {
            context: ({req}) => authContext.validate({req})
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphs: [
                {
                  name: "users",
                  url: "http://users:5991/graphql"
                },
                // {
                //   name: "posts",
                //   url: "http://localhost:3001/graphql"
                // }
              ]
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
      },
    })
  ],
  providers: [AuthContext]
})

export class AppModule {
}