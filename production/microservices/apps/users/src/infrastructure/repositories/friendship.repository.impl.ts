import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "./prismaDb/prisma.service";
import { FriendshipRepository } from "../../domain/repositories/friendship.repository";
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
      } : undefined
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

  async create(createUserInput: CreateFriendshipDto): Promise<Friendship> {
    try {
      return await this.prisma.friendship.create({
        data: createUserInput
      });
    } catch (e) {
      if (e instanceof Error && e.message.includes("receiverId")) {
        throw new ConflictException("request has been sent");
      }
    }
  }

  remove(removeInput: CreateFriendshipDto): Promise<Friendship> {
    return this.prisma.friendship.delete({
      where: {
        senderId_receiverId: removeInput
      }
    });
  }
}
