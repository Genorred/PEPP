import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UseTokens } from "./auth-flow-guard/UseTokens";
import { GoogleGuard } from "./auth-flow-guard/google.guard";
import { RedirectToGoogleSuccess } from "./auth-flow-guard/redirectToGoogleSuccess";

@Controller('auth')
export class GoogleController {
  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuth(@Req() req) {
    // Инициирует перенаправление на Google для авторизации
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  @UseInterceptors(RedirectToGoogleSuccess)
  async googleAuthRedirect(@Req() req) {
    // Обрабатывает callback после авторизации
  }
}