import { prisma } from '../database/prismaClient';
import { Barber } from '../interfaces/Barber';

export class BarberModel {
    static async create(data: Barber) {
        return await prisma.barber.create({
            data
        });
    }

    static async findByEmail(email: string) {
        return await prisma.barber.findUnique({
            where: { email }
        });
    }
}