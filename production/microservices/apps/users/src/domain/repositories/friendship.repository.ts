import { CreateFriendshipDto } from "../dto/input/friendship/create-friendship.dto";
import { FindUserFriendshipsDto } from "../dto/input/friendship/find-user-friendships.dto";
import { CountUserFriendshipsDto } from "../dto/input/friendship/count-user-friendships.dto";
import { Friendship } from "../entities/friendship.entity";
import { FindUsersFriendshipDto } from "../dto/input/friendship/find-users-friendship.dto";
import { FindOneFriendshipsDto } from "../dto/input/friendship/find-one-friendships.dto";
import { CountFriendshipsDto } from "../dto/input/friendship/count-friendships.dto";
import { UpdateFriendshipDto } from "../dto/input/friendship/update-friendship.dto";

export abstract class FriendshipRepository {
  abstract create(createUserInput: CreateFriendshipDto): Promise<Friendship>

  abstract findByUser(fields: FindUserFriendshipsDto): Promise<Friendship[]>

  abstract findOne(fields: FindOneFriendshipsDto): Promise<Friendship[]>

  abstract countByUser(fields: CountUserFriendshipsDto): Promise<number>

  abstract count(fields: CountFriendshipsDto): Promise<number>

  abstract findUsersFriendship(fields: FindUsersFriendshipDto): Promise<Friendship>

  abstract update(updateFriendshipDto: UpdateFriendshipDto): Promise<Friendship>

  abstract remove(removeInput: CreateFriendshipDto): Promise<Friendship>
}
