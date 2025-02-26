import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import redisConfig from "src/infrastructure/config/redis.config";
import authConfig from "../../infrastructure/config/auth.config";
import clientConfig from "../../infrastructure/config/client.config";
import googleConfig from "../../infrastructure/config/google.config";
import rabbitMQConfig from "../../infrastructure/config/rabbitMQ.config";
import frontendServerConfig from "../../infrastructure/config/frontend-server.config";

@Module({
  imports: [ConfigModule.forRoot({
    load: [authConfig, clientConfig, googleConfig, redisConfig, rabbitMQConfig, frontendServerConfig],
    expandVariables: true,
    cache: true,
    isGlobal: true
  })]
})
export class ConfigModuleInitializer {
}