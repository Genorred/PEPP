import { Injectable } from '@nestjs/common';
import { FriendshipRepository } from '../domain/repositories/friendship.repository';
import { CreateFriendshipDto } from '../domain/dto/input/friendship/create-friendship.dto';
import { CountUserFriendshipsDto } from 'src/domain/dto/input/friendship/count-user-friendships.dto';
import { FindUserFriendsDto } from './dto/friendships/find-user-friends.dto';
import { FindUsersFriendshipDto } from '../domain/dto/input/friendship/find-users-friendship.dto';
import { AcceptFriendshipDto } from './dto/friendships/accept-friendship.dto';
import { RemoveFriendshipDto } from '../domain/dto/input/friendship/remove-friendship.dto';

@Injectable()
export class FriendshipUseCase {
  constructor(private readonly friendshipRepository: FriendshipRepository) {}

  accept(updateFriendshipDto: AcceptFriendshipDto) {
    const { userId, id } = updateFriendshipDto;
    return this.friendshipRepository.update({
      isAccepted: true,
      id,
      userId,
    });
  }

  async findUserFriends(findAllUsersInput: FindUserFriendsDto) {
    return this.friendshipRepository.findByUser({
      ...findAllUsersInput,
      isAccepted: true,
    });
  }

  async findUsersFriendship(findUsersFriendshipDto: FindUsersFriendshipDto) {
    return this.friendshipRepository.findUsersFriendship(
      findUsersFriendshipDto,
    );
  }

  async findUserRequests(findAllUsersInput: FindUserFriendsDto) {
    return this.friendshipRepository.findOne({
      receiverId: findAllUsersInput.userId,
      cursorId: findAllUsersInput.cursorId,
      isAccepted: false,
    });
  }

  async create(createInput: CreateFriendshipDto) {
    return this.friendshipRepository.create(createInput);
  }

  async remove(removeInput: RemoveFriendshipDto) {
    return this.friendshipRepository.remove(removeInput);
  }

  async count(createInput: CountUserFriendshipsDto) {
    return this.friendshipRepository.countByUser(createInput);
  }

  async countRequests(createInput: CountUserFriendshipsDto) {
    return this.friendshipRepository.count({
      receiverId: createInput.userId,
      isAccepted: createInput.isAccepted,
    });
  }
}
