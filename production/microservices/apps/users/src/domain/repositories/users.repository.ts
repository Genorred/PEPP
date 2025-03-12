import { CreateUserDto } from "../dto/input/users/create-user.dto";
import { UpdateUserDto } from "../dto/input/users/update-user.dto";
import { FindOneUserDto } from "../dto/input/users/find-one-user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UsersRepository {
  abstract create(createUserInput: CreateUserDto): Promise<UserEntity>

  abstract findMany(fields: Partial<UserEntity>): Promise<UserEntity[]>

  abstract findManyByIds(fields: number[]): Promise<UserEntity[]>

  abstract findOne(searchOptions: FindOneUserDto): Promise<UserEntity>

  abstract update(id: number, updateUserInput: UpdateUserDto): Promise<UserEntity>

  abstract remove(id: number): Promise<UserEntity>
}
