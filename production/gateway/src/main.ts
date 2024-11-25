import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "http://localhost:9898",
      credentials: true,
    }
  });
  app.use(cookieParser());
  await app.listen(8080);
}
bootstrap();
