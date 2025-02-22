export abstract class NotificationService {
  abstract sendApproveUserEmail(email: string, token: string, returnUrl?: string);
}