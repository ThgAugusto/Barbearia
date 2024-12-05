import { Barbershop } from '@prisma/client';
import { prisma } from '../../core/database/prisma.client';
import { AutoRegister } from '../../utils/auto-register.decorator';
import { CreateBarbershopDTO, UpdateBarbershopDTO } from '../dtos/barbershop.dto';

@AutoRegister()
export class BarbershopRepository {

    async create(barbershopData: CreateBarbershopDTO): Promise<Barbershop> {
        return await prisma.barbershop.create({
            data: barbershopData,
        });
    }

    async findAllByOwner(ownerId: number): Promise<Barbershop[] | null> {
        return await prisma.barbershop.findMany({
            where: {
                ownerId,
            },
        });
    }

    async findByCnpj(cnpj: string): Promise<Barbershop | null> {
        return prisma.barbershop.findUnique({
            where: { cnpj },
        });
    }

    async findById(id: number): Promise<Barbershop | null> {
        return prisma.barbershop.findUnique({
            where: { id },
        });
    }

    async update(id: number, barbershopData: UpdateBarbershopDTO): Promise<Barbershop> {
        return await prisma.barbershop.update({
            where: { id },
            data: barbershopData,
        });
    }

    async softDelete(id: number): Promise<Barbershop> {
       return await prisma.barbershop.update({
            where: { id },
            data: { status: 'INACTIVE' },
        });
    }

    async restore(id: number): Promise<Barbershop> {
        return await prisma.barbershop.update({
          where: { id },
          data: { status: 'ACTIVE' }, 
        });
      }

}
