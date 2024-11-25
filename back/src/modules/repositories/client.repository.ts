import { Client } from '@prisma/client';
import { prisma } from '../../core/database/prisma.client';
import { AutoRegister } from '../../utils/auto-register.decorator';
import { CreateClientDTO, UpdateClientDTO } from '../dtos/client.dto';

@AutoRegister()
export class ClientRepository {

  async create(clientData: CreateClientDTO): Promise<Client> {
    return await prisma.client.create({
      data: clientData,
    });
  }

  async findAll(): Promise<Client[]> {
    return await prisma.client.findMany();
  }

  async findById(id: number): Promise<Client | null> {
    return prisma.client.findUnique({
      where: { id },
    });
  }
  
  async findByEmail(email: string): Promise<Client | null> {
    return prisma.client.findUnique({
      where: { email },
    });
  }

  async update(id: number, clientData: UpdateClientDTO): Promise<Client> {
    return await prisma.client.update({
      where: { id },
      data: clientData,
    });
  }

  async softDelete(id: number): Promise<void> {
    await prisma.client.update({
      where: { id },
      data: { status: 'INACTIVE' },
    });
  }
}
