import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Meta } from "../entities/roles.model";
import getUser from "../getUser";

@Injectable()
export class RolesGuard implements CanActivate{
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const user = getUser(context)
    const roles = this.reflector.getAllAndOverride(Meta.Roles, [context.getHandler(), context.getClass()]);
    if (roles?.length)
     return !!roles.includes(user['role'])
    throw new ForbiddenException();
  }
}
