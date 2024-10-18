import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "../../users/entities/user.entity";
import { Reflector } from "@nestjs/core";
import { Meta } from "../entities/roles.model";

@Injectable()
export class JwtGuard extends AuthGuard("jwt") {
  constructor(private reflector: Reflector) {
    super();
  }
  //
  // canActivate(context: ExecutionContext) {
  //   console.log(context, "canActivate");
  //   let result = super.canActivate(context);
  //
  //   const request = this.getRequest(context);
  //   const user = request.user as User;
  //   const roles = this.reflector.getAllAndOverride(Meta.Roles, [context.getHandler(), context.getClass()]);
  //   console.log(roles)
  //   console.log(user)
  //   if (roles?.length)
  //     result = !!roles.find(role => user.role.includes(role));
  //
  //   return result;
  // }
  //
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
