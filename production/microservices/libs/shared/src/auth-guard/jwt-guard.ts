import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import getUser from "../utils/getUser";
import { CustomContext } from "@_shared/types/CustomContext";
import getRequest from "@_shared/utils/getRequest";

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: CustomContext) {
    console.log(context);
    console.log(getRequest(context));
    if (!getUser(context))
      throw new UnauthorizedException();
    return true;
  }
}
