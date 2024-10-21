import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UseTokens } from "./gql-auth-guard/UseTokens";
import { GoogleGuard } from "./gql-auth-guard/google.guard";

@Controller('auth')
export class GoogleController {
  @Get('google')
  @UseGuards(GoogleGuard)
  async googleAuth(@Req() req) {
    // Инициирует перенаправление на Google для авторизации
  }

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  @UseTokens()
  async googleAuthRedirect(@Req() req) {
    // Обрабатывает callback после авторизации
    return {
      message: 'Успешная авторизация через Google',
      user: req.user
    };
  }
}