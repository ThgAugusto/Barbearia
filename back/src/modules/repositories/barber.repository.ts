import { Barber, User } from '@prisma/client';
import { prisma } from '../../core/database/prisma.client';
import { AutoRegister } from '../../utils/auto-register.decorator';
import { CreateBarberDTO, UpdateBarberDTO } from '../dtos/barber.dto';
import { BarbershopInfo } from '../dtos/barbershop.dto';

@AutoRegister()
export class BarberRepository {
  async create(data: CreateBarberDTO): Promise<Barber & { user: User; barbershop: BarbershopInfo }> {
    return await prisma.barber.create({
      data: {
        user: {
          create: data.user
        },
        barbershop: {
          connect: { id: data.barbershopId }
        },
      },
      include: {
        user: true,
        barbershop: {
          select: {
            id: true,
            socialReason: true,
            cnpj: true
          }
        }
      }
    });
  }

  async findAll(): Promise<(Barber & { user: User, barbershop: BarbershopInfo })[] | null> {
    return await prisma.barber.findMany({
      include: {
        user: true,
        barbershop: {
          select: {
            id: true,
            socialReason: true,
            cnpj: true
          }
        }
      },
    });
  }

  async findAllByOwnerId(ownerId: number): Promise<(Barber & { user: User, barbershop: BarbershopInfo })[] | null> {
    return await prisma.barber.findMany({
      where: { barbershop: { ownerId } },
      include: {
        user: true,
        barbershop: {
          select: {
            id: true,
            socialReason: true,
            cnpj: true
          }
        }
      },
    });
  }

  async findAllByBarbershopId(barbershopId: number): Promise<(Barber & { user: User, barbershop: BarbershopInfo })[] | null> {
    return await prisma.barber.findMany({
      where: { barbershop: { id: barbershopId } },
      include: {
        user: true,
        barbershop: {
          select: {
            id: true,
            socialReason: true,
            cnpj: true
          }
        }
      },
    });
  }


  async findById(id: number): Promise<Barber & { user: User, barbershop: BarbershopInfo } | null> {
    return prisma.barber.findUnique({
      where: { id },
      include: {
        user: true,
        barbershop: {
          select: {
            id: true,
            socialReason: true,
            cnpj: true
          }
        }
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email, },
    });
    
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {cpf,},
    });
  }

  async update(id: number, data: UpdateBarberDTO): Promise<Barber & { user: User, barbershop: BarbershopInfo }> {
    const updateData: any = {
      user: {
        update: data.user,
      },
    };

    if (data.barbershopId) {
      updateData.barbershop = {
        connect: { id: data.barbershopId },
      };
    }

    return await prisma.barber.update({
      where: { id },
      data: updateData,
      include: {
        user: true,
        barbershop: {
          select: {
            id: true,
            socialReason: true,
            cnpj: true
          }
        }
      },
    });
  }

  async softDelete(id: number): Promise<Barber & { user: User, barbershop: BarbershopInfo }> {
    return await prisma.barber.update({
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
        barbershop: {
          select: {
            id: true,
            socialReason: true,
            cnpj: true
          }
        }
      },
    });
  }

  async restore(id: number): Promise<Barber & { user: User, barbershop: BarbershopInfo }> {
    return await prisma.barber.update({
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
        barbershop: {
          select: {
            id: true,
            socialReason: true,
            cnpj: true
          }
        }
      },
    });
  }
}