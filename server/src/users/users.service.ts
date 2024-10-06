import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../prisma/prisma.service';
import { FindManyUserInput } from './dto/findMany-user.input';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserInput: CreateUserInput) {
    return this.prisma.user.create({data: createUserInput});
  }

  findMany(fields: FindManyUserInput) {
    return this.prisma.user.findMany({where: fields});
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({where: {id}});
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.prisma.user.update({data: updateUserInput, where: {id}});
  }

  remove(id: number) {
    return this.prisma.user.delete({where: {id}});
  }
}
