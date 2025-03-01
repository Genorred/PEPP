import { CreateUserDto } from "../dto/input/users/create-user.dto";
import { UpdateUserDto } from "../dto/input/users/update-user.dto";
import { User } from "../../interfaces/entities/user.entity";
import { FindOneUserDto } from "../dto/input/users/find-one-user.dto";
import { CreateFriendshipDto } from "../dto/input/friendship/create-friendship.dto";
import { FindUserFriendshipsDto } from "../dto/input/friendship/find-user-friendships.dto";
import { CountUserFriendshipsDto } from "../dto/input/friendship/count-user-friendships.dto";
import { Friendship } from "../entities/friendship.entity";

export abstract class FriendshipRepository {
  abstract create(createUserInput: CreateFriendshipDto): Promise<Friendship>

  abstract findByUser(fields: FindUserFriendshipsDto): Promise<Friendship[]>

  abstract countByUser(fields: CountUserFriendshipsDto): Promise<number>

  // abstract findOne(searchOptions: FindOneUserDto): Promise<User>

  // abstract update(id: number, updateUserInput: UpdateUserDto): Promise<User>

  abstract remove(removeInput: CreateFriendshipDto): Promise<Friendship>
}
