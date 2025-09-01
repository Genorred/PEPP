import { CreateFriendshipDto } from '../dto/input/friendship/create-friendship.dto';
import { FindUserFriendshipsDto } from '../dto/input/friendship/find-user-friendships.dto';
import { CountUserFriendshipsDto } from '../dto/input/friendship/count-user-friendships.dto';
import { FriendshipEntity } from '../entities/friendship.entity';
import { FindUsersFriendshipDto } from '../dto/input/friendship/find-users-friendship.dto';
import { FindOneFriendshipsDto } from '../dto/input/friendship/find-one-friendships.dto';
import { CountFriendshipsDto } from '../dto/input/friendship/count-friendships.dto';
import { UpdateFriendshipDto } from '../dto/input/friendship/update-friendship.dto';
import { RemoveFriendshipDto } from '../dto/input/friendship/remove-friendship.dto';

export abstract class FriendshipRepository {
  abstract create(
    createUserInput: CreateFriendshipDto,
  ): Promise<FriendshipEntity>;

  abstract findByUser(
    fields: FindUserFriendshipsDto,
  ): Promise<FriendshipEntity[]>;

  abstract findOne(fields: FindOneFriendshipsDto): Promise<FriendshipEntity[]>;

  abstract countByUser(fields: CountUserFriendshipsDto): Promise<number>;

  abstract count(fields: CountFriendshipsDto): Promise<number>;

  abstract findUsersFriendship(
    fields: FindUsersFriendshipDto,
  ): Promise<FriendshipEntity>;

  abstract update(
    updateFriendshipDto: UpdateFriendshipDto,
  ): Promise<FriendshipEntity>;

  abstract remove(removeInput: RemoveFriendshipDto): Promise<FriendshipEntity>;
}
