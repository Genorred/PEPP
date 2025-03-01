import { ConflictException, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginInput } from "../domain/dto/input/auth/login.input";
import * as argon2 from "argon2";
import { CustomContext } from "@_shared/types/CustomContext";
import getCookies from "@_shared/utils/getCookies";
import { UsersRepository } from "../domain/repositories/users.repository";
import { CreateUserDto } from "../domain/dto/input/users/create-user.dto";
import { TokenService } from "../domain/domain-service/token.service";
import { CacheRepository } from "../domain/repositories/cache.repository";
import { NotificationService } from "./services/notification.service";
import { GenerateUserCredentialsTokenDto } from "../domain/domain-service/dto/generate-user-credentials-token.dto";
import { RegisterInput } from "../interfaces/resolvers/dto-inputs/register.input";
import { FindAllUsersDto } from "./dto/findAllUsers.dto";
import frontendServerConfig from "../infrastructure/config/frontend-server.config";
import { ConfigType } from "@nestjs/config";
import { FriendshipRepository } from "../domain/repositories/friendship.repository";
import { FindOneUserDto } from "../domain/dto/input/users/find-one-user.dto";
import { FindUserFriendshipsDto } from "../domain/dto/input/friendship/find-user-friendships.dto";
import { CreateFriendshipInput } from "../interfaces/resolvers/dto-inputs/create-friendship.input";
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
    return this.friendshipRepository.findByUser({...findAllUsersInput, isAccepted: true});
  }

  async findUserRequests(findAllUsersInput: FindUserFriendsDto) {
    return this.friendshipRepository.findByUser({...findAllUsersInput, isAccepted: false});
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
