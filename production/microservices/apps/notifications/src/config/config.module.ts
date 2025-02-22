import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import rabbitMQConfig from "./rabbitMQ.config";
import mailConfig from "./mail.config";
import frontendConfig from "./frontend.config";

@Module({
  imports: [ConfigModule.forRoot({
    load: [rabbitMQConfig, mailConfig, frontendConfig],
    expandVariables: true,
    cache: true,
    isGlobal: true
  })]
})
export class ConfigModuleInitializer {
}