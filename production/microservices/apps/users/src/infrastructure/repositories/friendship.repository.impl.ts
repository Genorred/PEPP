import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "./prismaDb/prisma.service";
import { FriendshipRepository } from "../../domain/repositories/friendship.repository";
import { FindUserFriendshipsDto } from "../../domain/dto/input/friendship/find-user-friendships.dto";
import { CountUserFriendshipsDto } from "../../domain/dto/input/friendship/count-user-friendships.dto";
import { CreateFriendshipDto } from "../../domain/dto/input/friendship/create-friendship.dto";
import { Friendship } from "../../domain/entities/friendship.entity";
import { FindUsersFriendshipDto } from "../../domain/dto/input/friendship/find-users-friendship.dto";
import { FindOneFriendshipsDto } from "../../domain/dto/input/friendship/find-one-friendships.dto";
import { CountFriendshipsDto } from "../../domain/dto/input/friendship/count-friendships.dto";
import { UpdateFriendshipDto } from "../../domain/dto/input/friendship/update-friendship.dto";
import { RemoveFriendshipDto } from "../../domain/dto/input/friendship/remove-friendship.dto";

@Injectable()
export class FriendshipRepositoryImpl implements FriendshipRepository {
  constructor(private prisma: PrismaService
  ) {
  }

  update(updateFriendshipDto: UpdateFriendshipDto): Promise<Friendship> {
    const { isAccepted, userId, id } = updateFriendshipDto;
    return this.prisma.friendship.update({
      where: {
        id,
        OR: userId ? [
          {
            receiverId: userId
          },
          {
            senderId: userId
          }
        ] : undefined
      },
      data: {
        isAccepted
      }
    });
  }

  async findOne(fields: FindOneFriendshipsDto): Promise<Friendship[]> {
    const { senderId, receiverId, cursorId, isAccepted } = fields;
    const pageSize = 20;
    const response = await this.prisma.friendship.findMany({
      where: {
        senderId,
        receiverId,
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

  findUsersFriendship(fields: FindUsersFriendshipDto): Promise<Friendship> {
    const { userId1, userId2 } = fields;
    return this.prisma.friendship.findFirstOrThrow({
      where: {
        OR: [
          {
            senderId: userId1,
            receiverId: userId2
          },
          {
            senderId: userId2,
            receiverId: userId1
          }
        ]
      }
    });
  }

  countByUser(fields: CountUserFriendshipsDto): Promise<number> {
    const { userId, isAccepted } = fields;
    return this.prisma.friendship.count({
      where: {
        isAccepted,
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

  count(fields: CountFriendshipsDto): Promise<number> {
    const { senderId, receiverId, isAccepted } = fields;
    return this.prisma.friendship.count({
      where: {
        isAccepted,
        senderId,
        receiverId
      }
    });
  }

  async create(createUserInput: CreateFriendshipDto): Promise<Friendship> {
    const { senderId, receiverId } = createUserInput;
    if (senderId === receiverId) {
      throw new ConflictException("Request cannot be sent from user to himself");
    }
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

  async remove(removeInput: RemoveFriendshipDto): Promise<Friendship> {
    const { anotherUserId, authedUserId } = removeInput;
    let response
    try {
      response = await this.prisma.friendship.delete({
        where: {
          senderId_receiverId:
            {
              senderId: anotherUserId,
              receiverId: authedUserId
            }
        }
      });
    } catch (e) {
      response = await this.prisma.friendship.delete({
        where: {
          senderId_receiverId:
            {
              senderId: authedUserId,
              receiverId: anotherUserId
            }
        }
      });
    }
    return response;
  }
}
