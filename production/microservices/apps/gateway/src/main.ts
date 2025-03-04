import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const configService = app.get(ConfigService);
  const clientUrl = configService.get<string>("CLIENT_URL") || "http://localhost:9898";
  app.enableCors({
    origin: clientUrl,
    credentials: true
  });
  app.use(cookieParser());

  const port = 8080;
  await app.listen(port);
}

bootstrap();
