import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./entities/user.entity";
import { RedisClientConnectionType } from "@keyv/redis";
import { REDIS_CLIENT } from "../auth/redis.module";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService,
  ) {
  }

  async create(createUserInput: CreateUserInput) {
    try {
      return await this.prisma.user.create({
        data: {
          ...createUserInput,
          role: "USER"
        }
      });
    } catch (e) {
      console.log(e);
      const { message: message_1 } = e;
      if (message_1.includes("username"))
        throw new ConflictException("Username already in use");
      if (message_1.includes("google_id"))
        throw new ConflictException("Google id already in use");
      if (message_1.includes("email"))
        throw new ConflictException("Email already in use");
    }
  }

  findMany(fields: Partial<User>) {
    return this.prisma.user.findMany({ where: fields });
  }

  findOne(searchOptions: { id?: number, username?: string, email?: string, google_id?: string }) {
    const { id, username, email, google_id } = searchOptions;
    if (!(id || username || email || google_id)) {
      return null;
    }
    return this.prisma.user.findUnique({ where: searchOptions as User });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({ data: updateUserInput, where: { id } });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
