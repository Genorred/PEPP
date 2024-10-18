import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { User } from "../../users/entities/user.entity";
import { Reflector } from "@nestjs/core";
import { Meta } from "../entities/roles.model";
import getRequest from "../getRequest";
import getUser from "../getUser";

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    if(!getUser(context))
      throw new UnauthorizedException();
    return true
  }
}
