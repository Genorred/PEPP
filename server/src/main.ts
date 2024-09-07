import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const port = process.env.SERVER_PORT || 5000
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
      .setTitle('Median')
      .setDescription('The Median API description')
      .setVersion('0.1')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port, ()=>{
    console.log('server started on port ' + port)
  });


}
bootstrap();
