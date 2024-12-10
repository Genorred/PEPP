import { Controller, Get, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { GoogleGuard } from "./auth-flow-guard/google.guard";
import { RedirectToGoogleSuccess } from "./auth-flow-guard/redirectToGoogleSuccess";

@Controller("auth")
export class GoogleController {
  @Get("google")
  @UseGuards(GoogleGuard)
  async googleAuth(@Req() req) {
    // Инициирует перенаправление на Google для авторизации
  }

  @Get("google/callback")
  @UseGuards(GoogleGuard)
  @UseInterceptors(RedirectToGoogleSuccess)
  async googleAuthRedirect(@Req() req) {
    // Обрабатывает callback после авторизации
  }
}