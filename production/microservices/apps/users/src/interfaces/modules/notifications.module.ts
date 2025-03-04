import { ClientsModule, Transport } from "@nestjs/microservices";
import { Module } from "@nestjs/common";
import { NOTIFICATIONS_SERVICE } from "@_shared/consts/microservices-names";
import { NotificationService } from "../../application/services/notification.service";
import { NotificationServiceImpl } from "../../infrastructure/services/notification.service.impl";
import { ConfigType } from "@nestjs/config";
import rabbitMQConfig from "../../infrastructure/config/rabbitMQ.config";

@Module({
  imports: [
    ClientsModule.registerAsync([{
      name: NOTIFICATIONS_SERVICE,
      useFactory: (configService: ConfigType<typeof rabbitMQConfig>) => ({
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://${configService.user}:${configService.password}@rabbitmq:5672`],
          queue: "notifications_queue",
          queueOptions: {
            durable: false
          }
        }
      }),
      inject: [rabbitMQConfig.KEY]
    }])
  ],
  providers: [
    {
      provide: NotificationService,
      useClass: NotificationServiceImpl
    }
  ],
  exports: [NotificationService]
})
export class NotificationsModule {
}