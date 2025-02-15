import { CreateUserInput } from "../dto/input/users/create-user.input";
import { UpdateUserInput } from "../dto/input/users/update-user.input";
import { User } from "../entities/user.entity";
import { FindOneUserDto } from "../dto/input/users/find-one-user.dto";

export abstract class UsersRepository {
  abstract create(createUserInput: CreateUserInput): Promise<User>

  abstract findMany(fields: Partial<User>): Promise<User[]>

  abstract findOne(searchOptions: FindOneUserDto): Promise<User>

  abstract update(id: number, updateUserInput: UpdateUserInput): Promise<User>

  abstract remove(id: number): Promise<User>
}
