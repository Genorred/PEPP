
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super({
//       usernameField: 'emailOrUsername'
//     });
//   }
//
//   async validate(emailOrUsername: string, password: string): Promise<any> {
//     const user = await this.authService.validateUser({password, emailOrUsername});
//     console.log(user );
//     if (!user) {
//       throw new UnauthorizedException();
//     }
//     return user;
//   }
// }
