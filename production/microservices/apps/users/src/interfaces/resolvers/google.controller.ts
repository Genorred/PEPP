import { Controller, Get, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { GoogleGuard } from "../../infrastructure/guards/google.guard";
import { RedirectToGoogleSuccessInterceptor } from "../../infrastructure/interceptors/redirect-to-google-success.interceptor";

@Controller("auth")
export class GoogleController {
  @Get("google")
  @UseGuards(GoogleGuard)
  async googleAuth() {
    // inits redirect on Google for auth
  }

  @Get("google/callback")
  @UseGuards(GoogleGuard)
  @UseInterceptors(RedirectToGoogleSuccessInterceptor)
  async googleAuthRedirect() {
    // handles callback after auth
  }
}