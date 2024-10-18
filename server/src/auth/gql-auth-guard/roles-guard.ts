import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { User } from "../../users/entities/user.entity";
import { Reflector } from "@nestjs/core";
import { Meta } from "../entities/roles.model";

@Injectable()
export class RolesGuard implements CanActivate{
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = this.getRequest(context);
    const user = request.user as User;
    console.log(this.reflector)
    const roles = this.reflector.getAllAndOverride(Meta.Roles, [context.getHandler(), context.getClass()]);
    console.log(roles)
    console.log(user)
    if (roles?.length)
     return !!roles.find(role => user.role.includes(role));
    return false;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
