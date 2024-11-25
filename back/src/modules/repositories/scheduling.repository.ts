import { Barbershop, Client, Scheduling, SchedulingStatus, Treatment, User } from '@prisma/client';
import { prisma } from '../../core/database/prisma.client';
import { AutoRegister } from '../../utils/auto-register.decorator';
import { CreateSchedulingDTO, UpdateSchedulingDTO } from '../dtos/scheduling.dto';

@AutoRegister()
export class SchedulingRepository {

  async create(schedulingData: CreateSchedulingDTO): Promise<Scheduling & {
    barber: User;
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  }> {
    return await prisma.scheduling.create({
      data: schedulingData,
      include: {
        barber: true,
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }

  async findAll(): Promise<(Scheduling & {
    barber: User;
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  })[]> {
    return await prisma.scheduling.findMany({
      include: {
        barber: true,
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }

  async findById(id: number): Promise<Scheduling & {
    barber: User;
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  } | null> {
    return prisma.scheduling.findUnique({
      where: { id },
      include: {
        barber: true,
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }

  async findByClientId(clientId: number): Promise<(Scheduling & {
    barber: User;
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  })[]> {
    return prisma.scheduling.findMany({
      where: { clientId },
      include: {
        barber: true,
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }

  async update(id: number, schedulingData: Partial<UpdateSchedulingDTO>): Promise<Scheduling & {
    barber: User;
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  }> {
    return await prisma.scheduling.update({
      where: { id },
      data: schedulingData,
      include: {
        barber: true,
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }

  async softDelete(id: number): Promise<void> {
    await prisma.scheduling.update({
      where: { id },
      data: { status: SchedulingStatus.CANCELLED },
    });
  }

  async findConflictingScheduling(schedulingData: CreateSchedulingDTO): Promise<Scheduling | null> {
    return prisma.scheduling.findFirst({
      where: {
        barbershopId: schedulingData.barbershopId,
        barberId: schedulingData.barberId,
        dateTime: schedulingData.dateTime,
        status: { not: 'CANCELLED' },
      },
    });
  }
}
