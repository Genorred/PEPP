import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { LoginInput } from "./dto/login.input";
import { AuthService } from "./auth.service";
import { CreateUserInput } from "../users/dto/create-user.input";
import { CustomExecutionContext } from "@_shared/decorators/execution-context";
import { Credentials, CustomContext } from "@_shared/types/CustomContext";
import { UserResponse } from "./dto/returned-user.response";
import getCookies from "@_shared/utils/getCookies";
import { UnauthorizedException } from "@nestjs/common";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Mutation(returns => UserResponse)
  login(@CustomExecutionContext() context: CustomContext, @Args("loginInput") loginInput: LoginInput) {
    return this.authService.login(loginInput, context);
  }

  @Mutation(returns => UserResponse)
  register(@CustomExecutionContext() context: CustomContext, @Args("registerInput") registerInput: CreateUserInput) {
    return this.authService.register(registerInput, context);
  }

  @Mutation(returns => String)
  logout(@CustomExecutionContext() context: CustomContext) {
      return this.authService.logout(context);
  }
}
