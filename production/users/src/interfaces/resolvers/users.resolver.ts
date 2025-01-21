import { Args, Int, Mutation, Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { UsersRepositoryImpl } from "../../infrastructure/repositories/users.repository.impl";
import { User } from "../../domain/entities/user.entity";
import { UpdateUserInput } from "../../domain/dto/input/users/update-user.input";
import { FindOneUserInput } from "./dto-inputs/find-one-user.input";
import { FindManyUserInput } from "../../domain/dto/input/users/find-many-user.input";
import UseRoles from "@_shared/auth-guard/useRoles";
import { UsersRepository } from "../../domain/repositories/users.repository";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersRepository) {
  }

  @UseRoles("USER")
  @Query(() => [User], { name: "users" })
  findMany(@Args("findManyInput") findManyInput: FindManyUserInput) {
    return this.usersService.findMany(findManyInput);
  }

  @Query(() => User, { name: "user" })
  findOne(@Args("loginInput") findOneUserInput: FindOneUserInput) {
    return this.usersService.findOne(findOneUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args("id", { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<User> {
    return this.usersService.findOne({ id: reference.id });
  }
}
