import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const port = 8080;
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  console.log(port);
  console.log(port);
  await app.listen(port, () => {
    console.log("server started on port " + port);
  });


}

bootstrap();
