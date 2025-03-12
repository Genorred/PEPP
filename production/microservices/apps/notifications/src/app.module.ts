import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { MailerModule } from "@nestjs-modules/mailer";
import mailConfig from "./config/mail.config";
import { ConfigType } from "@nestjs/config";
import { PugAdapter } from "@nestjs-modules/mailer/dist/adapters/pug.adapter";
import { ConfigModuleInitializer } from "./config/config.module";
import { SharedLoggerModule } from "@_shared/modules/logger-module";
import { AppService } from "./app.service";

@Module({
  imports: [ConfigModuleInitializer, SharedLoggerModule,
    MailerModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof mailConfig>) => ({
        transport: {
          host: configService.host,
          port: configService.port,
          secure: false,
          auth: {
            user: configService.user,
            pass: configService.pass
          }
        },
        template: {
          dir: __dirname + "./template/notification",
          adapter: new PugAdapter({ inlineCssEnabled: true }),
          options: {
            strict: true
          }
        }
      }),
      inject: [mailConfig.KEY]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
