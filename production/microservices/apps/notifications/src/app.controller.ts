import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { Ctx, MessagePattern, Payload, RmqContext } from "@nestjs/microservices";
import { UserConfirmation } from "./dto/user-confirmation";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('user_confirmation')
  getHello(@Payload() data: UserConfirmation, @Ctx() ctx: RmqContext) {
    console.log('afdsa');
    return this.appService.sendApproveEmail(data)
  }
}
