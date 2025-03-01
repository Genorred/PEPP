import { Args, Int, Mutation, Resolver } from "@nestjs/graphql";
import { LoginInput } from "../../domain/dto/input/auth/login.input";
import { CreateUserDto } from "../../domain/dto/input/users/create-user.dto";
import { CustomExecutionContext } from "@_shared/decorators/execution-context";
import { Credentials, CustomContext } from "@_shared/types/CustomContext";
import { UserResponse } from "../../domain/dto/response/returned-user.response";
import { AuthUseCase } from "../../application/auth.use-case";
import { RegisterInput } from "./dto-inputs/register.input";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthUseCase) {
  }

  @Mutation(returns => UserResponse)
  login(@CustomExecutionContext() context: CustomContext, @Args("loginInput") loginInput: LoginInput) {
    return this.authService.login(loginInput, context);
  }

  @Mutation(returns => Boolean)
  register(@Args("registerInput") registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(returns => UserResponse)
  confirmUserEmail(@CustomExecutionContext() context: CustomContext, @Args("confirmUserEmailInput") registerInput: string) {
    return this.authService.confirmUserEmail(registerInput, context);
  }

  @Mutation(returns => String)
  logout(@CustomExecutionContext() context: CustomContext) {
      return this.authService.logout(context);
  }
}
