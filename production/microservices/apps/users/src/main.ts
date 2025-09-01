import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // const clientUrl = configService.get<string>('CLIENT_URL') || 'http://localhost:9898';
  // console.log(clientUrl);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useLogger(app.get(Logger));
  const port = 8080;
  await app.listen(port, () => {
    console.log('server started on port ' + port);
  });
}

bootstrap();
