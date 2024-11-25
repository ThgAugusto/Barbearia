import { User } from '@prisma/client';
import { prisma } from '../../core/database/prisma.client';
import { AutoRegister } from '../../utils/auto-register.decorator';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';

@AutoRegister()
export class UserRepository {

  async create(userData: CreateUserDTO): Promise<User> {
    return await prisma.user.create({
      data: userData,
    });
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  async update(id: number, userData: UpdateUserDTO): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async softDelete(id: number): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { status: 'INACTIVE' }, 
    });
  }

}
