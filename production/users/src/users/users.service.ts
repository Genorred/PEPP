import { ConflictException, Injectable } from "@nestjs/common";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";
import { PrismaService } from "../prisma/prisma.service";
import { FindOneUserInput } from "./dto/find-one-user.input";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {
  }

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({
      data: {
        ...createUserInput,
        role: "USER"
      }
    }).catch(e => {
      console.log(e);
      const { message } = e;
      if (message.includes("username"))
        throw new ConflictException("Username already in use");
      if (message.includes("google_id"))
        throw new ConflictException("Google id already in use");
      if (message.includes("email"))
        throw new ConflictException("Email already in use");
    });
  }

  findMany(fields: Partial<User>) {
    return this.prisma.user.findMany({ where: fields });
  }

  findOne(searchOptions: { id?: number, username?: string, email?: string }) {
    const { id, username, email } = searchOptions;
    if (!(id || username || email)) {
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
