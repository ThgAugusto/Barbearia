import { Treatment } from '@prisma/client';
import { prisma } from '../../core/database/prisma.client';
import { AutoRegister } from '../../utils/auto-register.decorator';
import { CreateTreatmentDTO, UpdateTreatmentDTO } from '../dtos/treatment.dto';

@AutoRegister()
export class TreatmentRepository {

    async create(treatmentData: CreateTreatmentDTO): Promise<Treatment> {
        return await prisma.treatment.create({
            data: treatmentData,
        });
    }

    async findAll(): Promise<Treatment[] | null> {
        return await prisma.treatment.findMany({
            where: { status: 'ACTIVE' },
        });
    }

    async findById(id: number): Promise<Treatment | null> {
        return prisma.treatment.findUnique({
            where: { id },
        });
    }
    async findAllByBarbershopId(barbershopId: number): Promise<Treatment[] | null> {
        return prisma.treatment.findMany({
            where: { 
                barbershopId: barbershopId,  
            },
        });
    }

    async update(id: number, treatmentData: UpdateTreatmentDTO): Promise<Treatment> {
        return await prisma.treatment.update({
            where: { id },
            data: treatmentData,
        });
    }

    async softDelete(id: number): Promise<Treatment> {
        return await prisma.treatment.update({
            where: { id },
            data: { status: 'INACTIVE' },
        });
    }

    async restore(id: number): Promise<Treatment>{
        return await prisma.treatment.update({
            where: { id },
            data: { status: 'ACTIVE' },
        });
    }
}
