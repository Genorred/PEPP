import { CanActivate, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Meta } from "../entities/roles.entity";
import getUser from "../utils/getUser";
import { CustomContext } from "@_shared/types/CustomContext";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: CustomContext) {
    console.log("context", context);
    const user = getUser(context);
    const roles = this.reflector.getAllAndOverride(Meta.Roles, [context.getHandler(), context.getClass()]);
    if (roles?.length)
      return !!roles.includes(user["role"]);
    throw new ForbiddenException();
  }
}
