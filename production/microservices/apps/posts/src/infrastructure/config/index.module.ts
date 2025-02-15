import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import FRONTEND_SERVER from "./frontend-server";
import elasticDb from "./elasticDb";
import redisConfig from "./redis";

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