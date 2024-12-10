import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import getUser from "../utils/getUser";

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    if (!getUser(context))
      throw new UnauthorizedException();
    return true;
  }
}
