import { Controller, Get, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { GoogleGuard } from "../../auth/auth-flow-guard/google.guard";
import { RedirectToGoogleSuccess } from "../../auth/auth-flow-guard/redirectToGoogleSuccess";

@Controller("auth")
export class GoogleController {
  @Get("google")
  @UseGuards(GoogleGuard)
  async googleAuth() {
    // inits redirect on Google for auth
  }

  @Get("google/callback")
  @UseGuards(GoogleGuard)
  @UseInterceptors(RedirectToGoogleSuccess)
  async googleAuthRedirect() {
    // handles callback after auth
  }
}