import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "../../domain/dto/input/users/create-user.dto";
import { UpdateUserDto } from "../../domain/dto/input/users/update-user.dto";
import { PrismaService } from "./prismaDb/prisma.service";
import { User } from "../../interfaces/entities/user.entity";
import { UsersRepository } from "../../domain/repositories/users.repository";
import { FriendshipRepository } from "../../domain/repositories/friendship.repository";
import { FindOneUserDto } from "../../domain/dto/input/users/find-one-user.dto";
import { FindUserFriendshipsDto } from "../../domain/dto/input/friendship/find-user-friendships.dto";
import { CountUserFriendshipsDto } from "../../domain/dto/input/friendship/count-user-friendships.dto";
import { CreateFriendshipDto } from "../../domain/dto/input/friendship/create-friendship.dto";
import { Friendship } from "../../domain/entities/friendship.entity";

@Injectable()
export class FriendshipRepositoryImpl implements FriendshipRepository {
  constructor(private prisma: PrismaService
  ) {
  }

  async findByUser(fields: FindUserFriendshipsDto): Promise<Friendship[]> {
    const { userId, cursorId, isAccepted } = fields;
    const pageSize = 20;
    const response = await this.prisma.friendship.findMany({
      where: {
        OR: [
          {
            senderId: userId
          },
          {
            receiverId: userId
          }
        ],
        isAccepted
      },
      take: pageSize,
      skip: cursorId ? 1 : 0,
      cursor: cursorId ? {
        id: cursorId
      }: undefined
    });
    return response.length ? response : [];
  }

  countByUser(fields: CountUserFriendshipsDto): Promise<number> {
    const { userId } = fields;
    return this.prisma.friendship.count({
      where: {
        OR: [
          {
            senderId: userId
          },
          {
            receiverId: userId
          }
        ]
      }
    });
  }

  create(createUserInput: CreateFriendshipDto): Promise<Friendship> {
    return this.prisma.friendship.create({
      data: createUserInput
    });
  }

  remove(removeInput: CreateFriendshipDto): Promise<Friendship> {
    return this.prisma.friendship.delete({
      where: {
        senderId_receiverId: removeInput
      }
    });
  }
}
