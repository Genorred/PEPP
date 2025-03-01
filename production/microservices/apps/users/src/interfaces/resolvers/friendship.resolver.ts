import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver, ResolveReference } from "@nestjs/graphql";
import { UsersRepositoryImpl } from "../../infrastructure/repositories/users.repository.impl";
import { UpdateUserDto } from "../../domain/dto/input/users/update-user.dto";
import { FindOneUserInput } from "./dto-inputs/find-one-user.input";
import { UsersRepository } from "../../domain/repositories/users.repository";
import UseRoles from "@_shared/auth-guard/useRoles";
import { FindManyUserInput } from "./dto-inputs/find-many-user.input";
import { UserUseCase } from "../../application/user.use-case";
import { FindAllUsersInput } from "./dto-inputs/findAllUsers.input";
import { Friendship } from "../entities/friendship.entity";
import { FriendshipUseCase } from "../../application/friendship.use-case";
import { FindUserFriendshipsDto } from "../../domain/dto/input/friendship/find-user-friendships.dto";
import { FindUserFriendshipsInput } from "./dto-inputs/find-user-friendships.input";
import { CreateFriendshipInput } from "./dto-inputs/create-friendship.input";
import { CountUserFriendshipsDto } from "../../domain/dto/input/friendship/count-user-friendships.dto";
import { CountUserFriendshipsInput } from "./dto-inputs/count-user-friendships.input";
import UseAuth from "@_shared/auth-guard/useAuth";
import { CurrentUser, CurrentUserI } from "@_shared/auth-guard/CurrentUser";
import { User } from "../entities/user.entity";
import { UserLoader } from "../batchers/users.batcher";

@Resolver(() => Friendship)
export class FriendshipResolver {
  constructor(
    private readonly friendshipUseCase: FriendshipUseCase,
    private readonly userLoader: UserLoader) {
  }

  @UseAuth()
  @Mutation(() => Friendship, { name: "sendFriendshipRequest" })
  async create(@Args("createFriendshipInput") createFriendshipInput: CreateFriendshipInput, @CurrentUser() currentUser: CurrentUserI): Promise<Friendship> {
    return {
      ... await this.friendshipUseCase.create({ ...createFriendshipInput, senderId: currentUser.sub }),
      currentUserId: currentUser.sub
    };
  }

  @UseAuth()
  @Mutation(() => Friendship, { name: "removeFriendship" })
  async remove(@Args("removeFriendshipInput") removeInput: CreateFriendshipInput, @CurrentUser() currentUser: CurrentUserI) {
    return {
      ... await this.friendshipUseCase.remove({ ...removeInput, senderId: currentUser.sub }),
      currentUserId: currentUser.sub
    };
  }

  @Query(() => [Friendship], { name: "userFriends" })
  async findUserFriends(@Args("findFriendsByUserInput") findFriendsByUserId: FindUserFriendshipsInput) {
    const a =  (await this.friendshipUseCase.findUserFriends(findFriendsByUserId)).map(value => ({
      ...value,
      currentUserId: findFriendsByUserId.userId
      }))
    console.log(a);
    return a;
  }

  @Query(() => [Friendship], { name: "userFriendRequests" })
  async findUserRequests(@Args("findFriendsByUserInput") findFriendsByUserId: FindUserFriendshipsInput) {
    return {
      ... await this.friendshipUseCase.findUserRequests(findFriendsByUserId),
      currentUserId: findFriendsByUserId.userId
    };
  }

  @Query(() => Int, { name: "userFriendsQuantity" })
  async count(@Args("countFriendshipInput") countInput: CountUserFriendshipsInput) {
    return this.friendshipUseCase.count(countInput);
  }

  @ResolveField(() => User)
  sender(@Parent() friendship: Friendship): any {
    return { __typename: "User", id: friendship.senderId };
  }

  @ResolveField(() => User)
  receiver(@Parent() friendship: Friendship): any {
    return { __typename: "User", id: friendship.receiverId };
  }

  @ResolveField(() => User)
  anotherUser(@Parent() friendship: Friendship): any {
    const id = friendship.currentUserId === friendship.receiverId ? friendship.senderId : friendship.receiverId;
    return this.userLoader.batchUsers.load(id);
  }
}
