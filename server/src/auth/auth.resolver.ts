import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login.input';
import { AuthService } from './auth.service';
import { Token } from './entities/token.entity';
import { CreateUserInput } from '../users/dto/create-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(returns => Token)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput)
  }
  @Mutation(returns => Token)
  register(@Args('registerInput') registerInput: CreateUserInput) {
    return this.authService.register(registerInput)
  }
}
