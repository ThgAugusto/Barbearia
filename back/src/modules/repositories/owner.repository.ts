import { prisma } from '../../core/database/prisma.client';
import { AutoRegister } from '../../utils/auto-register.decorator';
import { CreateOwnerDTO, UpdateOwnerDTO } from '../dtos/owner.dto';
import { Owner, User } from '@prisma/client';

@AutoRegister()
export class OwnerRepository {
  async create(data: CreateOwnerDTO): Promise<Owner & { user: User }> {
    return await prisma.owner.create({
      data: {
        user: {
          create: data.user,
        },
        phoneNumber: data.phoneNumber,
      },
      include: {
        user: true,
      },
    });
  }


  async findByEmail(email: string): Promise<Owner & { user: User } | null> {
    return prisma.owner.findFirst({
      where: {
        user: {
          email,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async findByCpf(cpf: string): Promise<Owner & { user: User } | null> {
    return prisma.owner.findFirst({
      where: {
        user: {
          cpf,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async findAll(): Promise<(Owner & { user: User })[] | null>  {
    return await prisma.owner.findMany({
      include: {
        user: true, 
      },
    });
  }

  async findById(id: number): Promise<Owner & { user: User } | null> {
    return await prisma.owner.findUnique({
      where: { id },
      include: {
        user: true, 
      },
    });
  }

  async findByUserId(userId: number): Promise<Owner & { user: User } | null> {
    return await prisma.owner.findUnique({
      where: { userId },
      include: {
        user: true, 
      },
    });
  }

  async update(id: number, data: UpdateOwnerDTO): Promise<Owner & { user: User }> {
    return await prisma.owner.update({
      where: { id },
      data: {
        phoneNumber: data.phoneNumber,
        user: {
          update: data.user,
        },
      },
      include: {
        user: true, 
      },
    });
  }

  async softDelete(id: number): Promise<Owner & { user: User } > {
    return await prisma.owner.update({
      where: { id },
      data: {
        user: {
          update: {
            status: 'INACTIVE',
          },
        },
      },
      include: {
        user: true, 
      },
    });

  }

  async restore(id: number): Promise<Owner & { user: User } > {
    return await prisma.owner.update({
      where: { id },
      data: {
        user: {
          update: {
            status: 'ACTIVE',
          },
        },
      },
      include: {
        user: true, 
      },
    });
  }
}
