import { UserEntity } from '../../entities/user.entity';

export interface GenerateUserCredentialsTokenDto
  extends Pick<UserEntity, 'email' | 'username' | 'password'> {}
