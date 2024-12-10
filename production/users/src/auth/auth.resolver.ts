import { Args, Context, Mutation, Query, Resolver } from "@nestjs/graphql";
import { LoginInput } from "./dto/login.input";
import { AuthService } from "./auth.service";
import { CreateUserInput } from "../users/dto/create-user.input";
import { UseTokens } from "./auth-flow-guard/UseTokens";
import { User } from "../users/entities/user.entity";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {
  }

  @Query(returns => User)
  @UseTokens()
  async login(@Context() context, @Args("loginInput") loginInput: LoginInput) {
    const user = await this.authService.login(loginInput);
    const request = context.switchToHttp().getRequest();
    request.user = user;
    console.log(user);
    return user;
  }

  @Mutation(returns => User)
  @UseTokens()
  async register(@Context() context, @Args("registerInput") registerInput: CreateUserInput) {
    const user = await this.authService.register(registerInput);
    console.log("user", user);
    if (context.req) {
      context.req.user = user;
    }
    console.log(user);
    return user;
  }
}
