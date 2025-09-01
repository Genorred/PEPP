import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CustomExecutionContext } from '@_shared/decorators/execution-context';
import { CustomContext } from '@_shared/types/CustomContext';
import { UserResponse } from './dto-responses/returned-user.response';
import { AuthUseCase } from '../../application/auth.use-case';
import { LoginInput } from './dto-inputs/auth/login.input';
import { RegisterInput } from './dto-inputs/auth/register.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthUseCase) {}

  @Mutation((returns) => UserResponse)
  login(
    @CustomExecutionContext() context: CustomContext,
    @Args('loginInput') loginInput: LoginInput,
  ) {
    return this.authService.login(loginInput, context);
  }

  @Mutation((returns) => Boolean)
  register(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation((returns) => UserResponse)
  confirmUserEmail(
    @CustomExecutionContext() context: CustomContext,
    @Args('confirmUserEmailInput') registerInput: string,
  ) {
    return this.authService.confirmUserEmail(registerInput, context);
  }

  @Mutation((returns) => String)
  logout(@CustomExecutionContext() context: CustomContext) {
    return this.authService.logout(context);
  }
}
