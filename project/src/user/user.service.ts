import { Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateUserDTO) {
    return this.prisma.user.create({
      data,
    });
  }
  async readUsers() {
    return this.prisma.user.findMany();
  }
  async read(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
