import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import NextjsEndpoint from "./nextjsEndpoint";
import elasticDb from "./elasticDb";
import redisConfig from "./redis";

@Module({
  imports: [ConfigModule.forRoot({
    load: [NextjsEndpoint, elasticDb, redisConfig],
    expandVariables: true,
    cache: true,
    isGlobal: true
  })]
})
export class ConfigModuleInitializer {
}