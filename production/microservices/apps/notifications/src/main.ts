import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestMicroserviceOptions } from "@nestjs/common/interfaces/microservices/nest-microservice-options.interface";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService);
  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${configService.get<string>("rabbitmq.user")}:${configService.get<string>("rabbitmq.password")}@rabbitmq:5672`],
      queue: 'notifications_queue',
      queueOptions: {
        durable: false
      },
    },
  });
  await microservice.listen();
}
bootstrap();
