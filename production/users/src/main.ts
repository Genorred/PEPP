import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.USERS_SERVER_PORT || 5000
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  console.log(port);
  console.log(port);
 await app.listen(port, ()=>{
    console.log('server started on port ' + port)
  });


}
bootstrap();
