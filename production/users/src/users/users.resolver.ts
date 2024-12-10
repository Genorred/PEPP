import { Args, Int, Mutation, Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { UpdateUserInput } from "./dto/update-user.input";
import { FindOneUserInput } from "./dto/find-one-user.input";
import { FindManyUserInput } from "./dto/find-many-user.input";
import UseRoles from "@_shared/auth-guard/useRoles";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {
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
