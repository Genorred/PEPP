import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import getUser from '../utils/getUser';
import { CustomContext } from '@_shared/types/CustomContext';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: CustomContext) {
    if (!getUser(context)) throw new UnauthorizedException();
    return true;
  }
}
