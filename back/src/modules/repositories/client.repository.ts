import { Barbershop, Client } from '@prisma/client';
import { prisma } from '../../core/database/prisma.client';
import { AutoRegister } from '../../utils/auto-register.decorator';
import { CreateClientDTO, UpdateClientDTO } from '../dtos/client.dto';

@AutoRegister()
export class ClientRepository {

  async create(clientData: CreateClientDTO): Promise<Client & { barbershop: Barbershop }> {
    return await prisma.client.create({
      data: clientData,
      include: {
        barbershop: true,
      },
    });
  }

  async findAll(): Promise<(Client & { barbershop: Barbershop })[]> {
    return await prisma.client.findMany({
      include: {
        barbershop: true,
      },
    });
  }

  async findAllByOwnerId(ownerId: number): Promise<(Client & { barbershop: Barbershop })[] | null> {
    return await prisma.client.findMany({
      where: {
        barbershop: {
          ownerId,
        },
      },
      include: {
        barbershop: true,
      },
    });
  }


  async findAllByBarbershopId(barbershopId: number): Promise<(Client & { barbershop: Barbershop })[] | null> {
    return await prisma.client.findMany({
      where: {
        barbershop: {
          id: barbershopId,
        },
      },
      include: {
        barbershop: true,
      },
    });
  }

  async findById(id: number): Promise<Client & { barbershop: Barbershop } | null> {
    return prisma.client.findUnique({
      where: { id },
      include: {
        barbershop: true,
      },
    });

  }

  async findByEmail(email: string): Promise<Client & { barbershop: Barbershop } | null> {
    return prisma.client.findUnique({
      where: { email },
      include: {
        barbershop: true,
      },
    });
  }

  async update(id: number, clientData: UpdateClientDTO): Promise<Client & { barbershop: Barbershop }> {
    return await prisma.client.update({
      where: { id },
      data: clientData,
      include: {
        barbershop: true,
      },
    });
  }

  async softDelete(id: number): Promise<Client & { barbershop: Barbershop }> {

    return await prisma.client.update({
      where: { id },
      data: { status: 'INACTIVE' },
      include: {
        barbershop: true,
      },
    });
  }

  async restore(id: number): Promise<Client & { barbershop: Barbershop }> {
    return await prisma.client.update({
      where: { id },
      data: { status: 'ACTIVE' },
      include: {
        barbershop: true,
      },
    });
  }
}
