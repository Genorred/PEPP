import { ObjectType, OmitType } from '@nestjs/graphql';
import { User } from '../../graphql-entities/user.graphql-entity';

@ObjectType()
export class UserResponse extends OmitType(User, ['password']) {}
