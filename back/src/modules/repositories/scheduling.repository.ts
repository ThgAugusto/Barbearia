import { Barbershop, Client, Scheduling, SchedulingStatus, Treatment, User, Barber } from '@prisma/client';
import { prisma } from '../../core/database/prisma.client';
import { AutoRegister } from '../../utils/auto-register.decorator';
import { CreateSchedulingDTO, UpdateSchedulingDTO } from '../dtos/scheduling.dto';

@AutoRegister()
export class SchedulingRepository {
  async create(schedulingData: CreateSchedulingDTO): Promise<Scheduling & {
    barber: Barber & { user: User };
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  }> {
    return await prisma.scheduling.create({
      data: schedulingData,
      include: {
        barber: {
          include: { user: true },
        },
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }

  async findAll(): Promise<(Scheduling & {
    barber: Barber & { user: User };
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  })[]> {
    return await prisma.scheduling.findMany({
      include: {
        barber: {
          include: { user: true },
        },
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }

  async findById(id: number): Promise<Scheduling & {
    barber: Barber & { user: User };
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  } | null> {
    return prisma.scheduling.findUnique({
      where: { id },
      include: {
        barber: {
          include: { user: true },
        },
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }

  async findByClientId(clientId: number): Promise<(Scheduling & {
    barber: Barber & { user: User };
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  })[]> {
    return prisma.scheduling.findMany({
      where: { clientId },
      include: {
        barber: {
          include: { user: true },
        },
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }

  async update(id: number, schedulingData: Partial<UpdateSchedulingDTO>): Promise<Scheduling & {
    barber: Barber & { user: User };
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  }> {
    return await prisma.scheduling.update({
      where: { id },
      data: schedulingData,
      include: {
        barber: {
          include: { user: true },
        },
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }

  async softDelete(id: number): Promise<Scheduling & {
    barber: Barber & { user: User };
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  }> {
    return prisma.scheduling.update({
      where: { id },
      data: { status: SchedulingStatus.CANCELLED },
      include: {
        barber: {
          include: { user: true },
        },
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }


  async markAsCompleted(id: number): Promise<Scheduling & {
    barber: Barber & { user: User };
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  }> {
    return prisma.scheduling.update({
      where: { id },
      data: { status: SchedulingStatus.COMPLETED },
      include: {
        barber: {
          include: { user: true },
        },
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }


  async findAllByOwner(ownerId: number): Promise<(Scheduling & {
    barber: Barber & { user: User };
    client: Client;
    barbershop: Barbershop;
    treatment: Treatment;
  })[]> {
    return prisma.scheduling.findMany({
      where: {
        barbershop: {
          ownerId,
        },
      },
      include: {
        barber: {
          include: {
            user: true
          },
        },
        client: true,
        barbershop: true,
        treatment: true,
      },
    });
  }


  async findSchedulesByBarber(barberId: number, start: Date, end: Date) {
    return prisma.scheduling.findMany({
      where: {
        barberId,
        startTime: { gte: start },
        endTime: { lte: end },
        status: { in: ['SCHEDULED', 'COMPLETED'] },
      },
      orderBy: { startTime: 'asc' },
    });
  }


}
