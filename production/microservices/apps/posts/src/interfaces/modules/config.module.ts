import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import FRONTEND_SERVER from "../../infrastructure/config/frontend-server";
import elasticDb from "../../infrastructure/config/elasticDb";
import redisConfig from "../../infrastructure/config/redis";

@Module({
  imports: [ConfigModule.forRoot({
    load: [FRONTEND_SERVER, elasticDb, redisConfig],
    expandVariables: true,
    cache: true,
    isGlobal: true
  })]
})
export class ConfigModuleInitializer {
}