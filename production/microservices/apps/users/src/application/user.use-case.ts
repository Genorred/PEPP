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

@Injectable()
export class UserUseCase {
  constructor(
    @Inject(frontendServerConfig.KEY) private readonly configService: ConfigType<typeof frontendServerConfig>,
    private readonly usersRepository: UsersRepository,
  ) {
  }

  async findAllUsers(findAllUsersInput: FindAllUsersDto) {
      const { token } = findAllUsersInput;
      if (this.configService.token === token) {
        return this.usersRepository.findMany({});
      } else {
        throw new UnauthorizedException();
      }
  }
}
