import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import redisConfig from "src/infrastructure/config/redis.config";
import authConfig from "../../infrastructure/config/auth.config";
import clientConfig from "../../infrastructure/config/client.config";
import googleConfig from "../../infrastructure/config/google.config";

@Module({
  imports: [ConfigModule.forRoot({
    load: [authConfig, clientConfig, googleConfig, redisConfig],
    expandVariables: true,
    cache: true,
    isGlobal: true
  })]
})
export class ConfigModuleInitializer {
}