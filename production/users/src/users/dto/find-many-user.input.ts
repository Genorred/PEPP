import { Field, InputType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CreateUserInput } from './create-user.input';

@InputType()
export class FindManyUserInput extends PartialType(CreateUserInput) {
}
