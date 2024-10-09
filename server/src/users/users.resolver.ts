import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindOneUserInput } from './dto/find-one-user.input';
import { LoginInput } from '../auth/dto/login.input';
import { FindManyUserInput } from './dto/find-many-user.input';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UseGuards } from '@nestjs/common';
import { JwtGqlAuthGuard } from '../auth/gql-auth-guard/jwt-gql-auth-guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  // @Mutation(() => User)
  // createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.create(createUserInput);
  // }

  @UseGuards(JwtGqlAuthGuard)
  @Query(() => [User], { name: 'users' })
  findMany(@Args('findManyInput') findManyInput: FindManyUserInput) {
    return this.usersService.findMany(findManyInput);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('loginInput') findOneUserInput: FindOneUserInput) {
    return this.usersService.findOne(findOneUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}
