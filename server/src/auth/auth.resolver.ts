import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { Token } from './entities/token.entity';
import { CreateUserInput } from '../users/dto/create-user.input';
import { GoogleGuard } from "./gql-auth-guard/google-guard";
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => Token)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput)
  }
  @Mutation(returns => Token)
  register(@Args('registerInput') registerInput: CreateUserInput) {
    return this.authService.register(registerInput)
  }
  // @Get('google')
  // @UseGuards(GoogleGuard)
  // // eslint-disable-next-line @typescript-eslint/no-empty-function
  // async auth() {}
  //
  // @Get('google/callback')
  // @UseGuards(GoogleOauthGuard)
  // async googleAuthCallback(@Req() req, @Res() res: Response) {
  //   const token = await this.authService.signIn(req.user);
  //
  //   res.cookie('access_token', token, {
  //     maxAge: 2592000000,
  //     sameSite: true,
  //     secure: false,
  //   });
  //
  //   return res.status(HttpStatus.OK);
  // }
}
