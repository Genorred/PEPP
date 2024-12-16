import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LoginInput } from "./dto/login.input";
import { AuthService } from "./auth.service";
import { CreateUserInput } from "../users/dto/create-user.input";
import { UseTokens } from "./auth-flow-guard/UseTokens";
import { User } from "../users/entities/user.entity";
import { ServerResponse } from "node:http";
import { CustomExecutionContext } from "@_shared/decorators/execution-context";
import { CustomContext } from "@_shared/types/CustomContext";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Query(returns => User)
  @UseTokens()
  login(@CustomExecutionContext() context: CustomContext, @Args("loginInput") loginInput: LoginInput) {
    return this.authService.login(loginInput, context);
  }

  @Mutation(returns => User)
  @UseTokens()
  register(@CustomExecutionContext() context: CustomContext, @Args("registerInput") registerInput: CreateUserInput) {
    return  this.authService.register(registerInput, context);
  }
}
