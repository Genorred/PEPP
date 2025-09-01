import { UserEntity } from '../../entities/user.entity';

export interface GenerateTokenDto extends Pick<UserEntity, 'id' | 'role'> {}
