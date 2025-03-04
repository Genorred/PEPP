import { Injectable } from "@nestjs/common";
import { FriendshipRepository } from "../domain/repositories/friendship.repository";
import { CreateFriendshipDto } from "../domain/dto/input/friendship/create-friendship.dto";
import { CountUserFriendshipsDto } from "src/domain/dto/input/friendship/count-user-friendships.dto";
import { FindUserFriendsDto } from "./dto/find-user-friends.dto";

@Injectable()
export class FriendshipUseCase {
  constructor(
    private readonly friendshipRepository: FriendshipRepository
  ) {
  }

  async findUserFriends(findAllUsersInput: FindUserFriendsDto) {
    return this.friendshipRepository.findByUser({ ...findAllUsersInput, isAccepted: true });
  }

  async findUserRequests(findAllUsersInput: FindUserFriendsDto) {
    return this.friendshipRepository.findByUser({ ...findAllUsersInput, isAccepted: false });
  }

  async create(createInput: CreateFriendshipDto) {
    return this.friendshipRepository.create(createInput);
  }

  async remove(removeInput: CreateFriendshipDto) {
    return this.friendshipRepository.remove(removeInput);
  }

  async count(createInput: CountUserFriendshipsDto) {
    return this.friendshipRepository.countByUser(createInput);
  }
}
