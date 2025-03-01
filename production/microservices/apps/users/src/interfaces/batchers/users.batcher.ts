import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { UsersRepository } from "../../domain/repositories/users.repository";

@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  constructor(private readonly usersRepository: UsersRepository) {}

  public readonly batchUsers = new DataLoader(async (userIds: number[]) => {
    const users = await this.usersRepository.findManyByIds(userIds);
    const userMap = new Map(users.map(user => [user.id, user]));
    return userIds.map(id => userMap.get(id));
  });
}