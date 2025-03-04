import { Args, Int, Mutation, Query, Resolver, ResolveReference } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { UpdateUserDto } from "../../domain/dto/input/users/update-user.dto";
import { FindOneUserInput } from "./dto-inputs/find-one-user.input";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { UserUseCase } from "../../application/user.use-case";
import { FindAllUsersInput } from "./dto-inputs/findAllUsers.input";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersRepository: UsersRepository,
              private readonly userUseCase: UserUseCase) {
  }

  @Query(() => [User], { name: "allUsers" })
  findAllUsers(@Args("findManyInput") findManyInput: FindAllUsersInput) {
    return this.userUseCase.findAllUsers(findManyInput);
  }

  @Query(() => User, { name: "user" })
  findOne(@Args("findOneUserInput") findOneUserInput: FindOneUserInput) {
    return this.usersRepository.findOne(findOneUserInput);
  }

  @Mutation(() => User)
  updateUser(@Args("updateUserInput") updateUserInput: UpdateUserDto) {
    return this.usersRepository.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args("id", { type: () => Int }) id: number) {
    return this.usersRepository.remove(id);
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }): Promise<User> {
    return this.usersRepository.findOne({ id: reference.id });
  }
}
