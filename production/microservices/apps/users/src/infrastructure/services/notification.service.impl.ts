import { NotificationService } from '../../application/services/notification.service';
import { Inject } from '@nestjs/common';
import { NOTIFICATIONS_SERVICE } from '@_shared/consts/microservices-names';
import { ClientProxy } from '@nestjs/microservices';

export class NotificationServiceImpl implements NotificationService {
  constructor(
    @Inject(NOTIFICATIONS_SERVICE) private readonly client: ClientProxy,
  ) {}

  sendApproveUserEmail(email: string, token: string, returnUrl?: string) {
    try {
      const a = this.client.emit('user_confirmation', {
        email,
        token,
        returnUrl,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
