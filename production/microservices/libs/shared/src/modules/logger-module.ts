import { LoggerModule } from "nestjs-pino";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: "pino-pretty",
          options: {
            singleLine: true
          }
        }
      }
    })
  ]
})
export class SharedLoggerModule {
}
