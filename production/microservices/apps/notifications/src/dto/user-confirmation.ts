export interface UserConfirmation {
  email: string;
  token: string;
  returnUrl?: string;
}