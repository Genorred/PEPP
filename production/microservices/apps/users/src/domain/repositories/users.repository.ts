import { CreateUserDto } from "../dto/input/users/create-user.dto";
import { UpdateUserDto } from "../dto/input/users/update-user.dto";
import { User } from "../../interfaces/entities/user.entity";
import { FindOneUserDto } from "../dto/input/users/find-one-user.dto";

export abstract class UsersRepository {
  abstract create(createUserInput: CreateUserDto): Promise<User>

  abstract findMany(fields: Partial<User>): Promise<User[]>

  abstract findManyByIds(fields: number[]): Promise<User[]>

  abstract findOne(searchOptions: FindOneUserDto): Promise<User>

  abstract update(id: number, updateUserInput: UpdateUserDto): Promise<User>

  abstract remove(id: number): Promise<User>
}
