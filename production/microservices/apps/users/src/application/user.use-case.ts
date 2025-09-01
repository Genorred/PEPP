import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../domain/repositories/users.repository';
import { FindAllUsersDto } from './dto/users/findAllUsers.dto';
import frontendServerConfig from '../infrastructure/config/frontend-server.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class UserUseCase {
  constructor(
    @Inject(frontendServerConfig.KEY)
    private readonly configService: ConfigType<typeof frontendServerConfig>,
    private readonly usersRepository: UsersRepository,
  ) {}

  async findAllUsers(findAllUsersInput: FindAllUsersDto) {
    const { token } = findAllUsersInput;
    if (this.configService.token === token) {
      return this.usersRepository.findMany({});
    } else {
      throw new UnauthorizedException();
    }
  }
}
