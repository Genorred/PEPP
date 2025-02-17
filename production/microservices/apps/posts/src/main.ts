import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "nestjs-pino";

async function bootstrap() {
  const port = 8080;
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  app.useLogger(app.get(Logger))
  await app.listen(port, () => {
    console.log("server started on port " + port);
  });


}

bootstrap();
