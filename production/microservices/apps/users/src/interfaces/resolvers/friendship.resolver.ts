import { Args, Int, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Friendship } from "../entities/friendship.entity";
import { FriendshipUseCase } from "../../application/friendship.use-case";
import { FindUserFriendshipsInput } from "./dto-inputs/find-user-friendships.input";
import { CreateFriendshipInput } from "./dto-inputs/create-friendship.input";
import { CountUserFriendshipsInput } from "./dto-inputs/count-user-friendships.input";
import UseAuth from "@_shared/auth-guard/useAuth";
import { CurrentUser, CurrentUserI } from "@_shared/auth-guard/CurrentUser";
import { User } from "../entities/user.entity";
import { UserLoader } from "../batchers/users.batcher";
import { FindUsersFriendshipInput } from "./dto-inputs/find-users-friendship.input";
import { FindUserFriendshipRequestsInput } from "./dto-inputs/find-user-friendship-requests.input";
import { UpdateFriendshipInput } from "./dto-inputs/update-friendship.input";
import { RemoveFriendshipInput } from "./dto-inputs/remove-friendship.input";

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
      ...await this.friendshipUseCase.create({ ...createFriendshipInput, senderId: currentUser.sub }),
      currentUserId: currentUser.sub
    };
  }

  @UseAuth()
  @Mutation(() => Friendship, { name: "removeFriendship" })
  async remove(@Args("removeFriendshipInput") removeInput: RemoveFriendshipInput, @CurrentUser() currentUser: CurrentUserI) {
    return {
      ...await this.friendshipUseCase.remove({ ...removeInput, authedUserId: currentUser.sub }),
      currentUserId: currentUser.sub
    };
  }

  @Query(() => [Friendship], { name: "userFriends" })
  async findUserFriends(@Args("findFriendsByUserInput") findFriendsByUserId: FindUserFriendshipsInput) {
    const a = (await this.friendshipUseCase.findUserFriends(findFriendsByUserId)).map(value => ({
      ...value,
      currentUserId: findFriendsByUserId.userId
    }));
    console.log(a);
    return a;
  }

  @UseAuth()
  @Query(() => Friendship, { name: "usersFriendship" })
  async findUsersFriendship(@Args("findUsersFriendship") findUsersFriendshipInput: FindUsersFriendshipInput, @CurrentUser() currentUser: CurrentUserI) {
    return {
      ...await this.friendshipUseCase.findUsersFriendship(findUsersFriendshipInput),
      currentUserId: currentUser.sub
    };
  }

  @UseAuth()
  @Mutation(() => Friendship, { name: "acceptFriendshipRequest" })
  async acceptFriendshipRequest(@Args("updateFriendshipInput",) updateFriendshipInput: UpdateFriendshipInput, @CurrentUser() currentUser: CurrentUserI) {
    return {
      ...await this.friendshipUseCase.accept({
        userId: currentUser.sub,
        id: updateFriendshipInput.requestId
      }),
      currentUserId: currentUser.sub
    };
  }


  @Query(() => [Friendship], { name: "userFriendRequests" })
  async findUserRequests(@Args("findFriendsByUserInput") findFriendsByUserId: FindUserFriendshipRequestsInput, @CurrentUser() currentUser: CurrentUserI) {
    return (await this.friendshipUseCase.findUserRequests({
      userId: currentUser.sub,
      cursorId: findFriendsByUserId.cursorId
    })).map(value => ({
      ...value,
      currentUserId: currentUser.sub
    }));
  }

  @Query(() => Int, { name: "userFriendsQuantity" })
  async count(@Args("countFriendshipInput") countInput: CountUserFriendshipsInput) {
    return this.friendshipUseCase.count(countInput);
  }

  @Query(() => Int, { name: "userFriendRequestsQuantity" })
  async countRequests(@Args("countFriendshipInput") countInput: CountUserFriendshipsInput) {
    return this.friendshipUseCase.countRequests(countInput);
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
