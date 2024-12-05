import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { SchedulingRepository } from '../repositories/scheduling.repository';
import {
  CreateSchedulingDTO,
  UpdateSchedulingDTO,
  SchedulingResponseDTO,
  SchedulingDTO
} from '../dtos/scheduling.dto';
import { BarbershopService } from './barbershop.service';
import { TreatmentService } from './treatment.service';
import { BarberService } from './barber.service';
import { ClientService } from './client.service';
import {
  SchedulingBarberNotFoundError,
  SchedulingConflictError,
  SchedulingClientNotFoundError,
  SchedulingBarbershopNotFoundError,
  SchedulingTreatmentNotFoundError,
  SchedulingNotFoundError
} from '../../exceptions/scheduling.exceptions';
import { ClientDTO } from '../dtos/client.dto';
import { BarbershopDTO } from '../dtos/barbershop.dto';
import { TreatmentDTO } from '../dtos/treatment.dto';
import { BarberDTO } from '../dtos/barber.dto';

@AutoRegister()
export class SchedulingService {
  constructor(
    @inject(SchedulingRepository) private readonly schedulingRepository: SchedulingRepository,
    @inject(BarbershopService) private readonly barbershopService: BarbershopService,
    @inject(TreatmentService) private readonly treatmentService: TreatmentService,
    @inject(BarberService) private readonly barberService: BarberService,
    @inject(ClientService) private readonly clientService: ClientService
  ) { }

  async create(schedulingData: CreateSchedulingDTO): Promise<SchedulingResponseDTO> {
    const barbershop = await this.barbershopService.findById(schedulingData.barbershopId);
    if (!barbershop) throw new SchedulingBarbershopNotFoundError();

    const barber = await this.barberService.findById(schedulingData.barberId);
    if (!barber) throw new SchedulingBarberNotFoundError();

    const treatment = await this.treatmentService.findById(schedulingData.treatmentId);
    if (!treatment) throw new SchedulingTreatmentNotFoundError();

    const client = await this.clientService.findById(schedulingData.clientId);
    if (!client) throw new SchedulingClientNotFoundError();

    const createdScheduling = await this.schedulingRepository.create(schedulingData);

    return new SchedulingDTO(createdScheduling).toResponse(
      new BarberDTO(createdScheduling.barber, createdScheduling.barber.user).toResponse(),
      new ClientDTO(createdScheduling.client).toResponse(),
      new BarbershopDTO(createdScheduling.barbershop).toResponse(),
      new TreatmentDTO(createdScheduling.treatment).toResponse()
    );
  }

  async findById(id: number): Promise<SchedulingResponseDTO> {
    const scheduling = await this.schedulingRepository.findById(id);
    if (!scheduling) throw new SchedulingNotFoundError();

    return new SchedulingDTO(scheduling).toResponse(
      new BarberDTO(scheduling.barber, scheduling.barber.user).toResponse(),
      new ClientDTO(scheduling.client).toResponse(),
      new BarbershopDTO(scheduling.barbershop).toResponse(),
      new TreatmentDTO(scheduling.treatment).toResponse()
    );
  }

  async findAllByOwner(ownerId: number): Promise<SchedulingResponseDTO[]> {
    const schedulings = await this.schedulingRepository.findAllByOwner(ownerId);
    return schedulings.map((scheduling) =>
      new SchedulingDTO(scheduling).toResponse(
        new BarberDTO(scheduling.barber, scheduling.barber.user).toResponse(),
        new ClientDTO(scheduling.client).toResponse(),
        new BarbershopDTO(scheduling.barbershop).toResponse(),
        new TreatmentDTO(scheduling.treatment).toResponse()
      )
    );
  }

  async findAll(): Promise<SchedulingResponseDTO[]> {
    const schedulings = await this.schedulingRepository.findAll();
    return schedulings.map((scheduling) =>
      new SchedulingDTO(scheduling).toResponse(
        new BarberDTO(scheduling.barber, scheduling.barber.user).toResponse(),
        new ClientDTO(scheduling.client).toResponse(),
        new BarbershopDTO(scheduling.barbershop).toResponse(),
        new TreatmentDTO(scheduling.treatment).toResponse()
      )
    );
  }

  async update(id: number, schedulingData: Partial<UpdateSchedulingDTO>): Promise<SchedulingResponseDTO> {
    const existingScheduling = await this.schedulingRepository.findById(id);
    if (!existingScheduling) throw new SchedulingNotFoundError();

    const updatedScheduling = await this.schedulingRepository.update(id, schedulingData);

    return new SchedulingDTO(updatedScheduling).toResponse(
      new BarberDTO(updatedScheduling.barber, updatedScheduling.barber.user).toResponse(),
      new ClientDTO(updatedScheduling.client).toResponse(),
      new BarbershopDTO(updatedScheduling.barbershop).toResponse(),
      new TreatmentDTO(updatedScheduling.treatment).toResponse()
    );
  }

  async softDelete(id: number): Promise<SchedulingResponseDTO> {
    const existingScheduling = await this.schedulingRepository.findById(id);
    if (!existingScheduling) throw new SchedulingNotFoundError();

    const updatedScheduling = await this.schedulingRepository.softDelete(id);

    return new SchedulingDTO(updatedScheduling).toResponse(
      new BarberDTO(updatedScheduling.barber, updatedScheduling.barber.user).toResponse(),
      new ClientDTO(updatedScheduling.client).toResponse(),
      new BarbershopDTO(updatedScheduling.barbershop).toResponse(),
      new TreatmentDTO(updatedScheduling.treatment).toResponse()
    );
  }

  async markAsCompleted(id: number): Promise<SchedulingResponseDTO> {
    const existingScheduling = await this.schedulingRepository.findById(id);
    if (!existingScheduling) throw new SchedulingNotFoundError();

    const updatedScheduling = await this.schedulingRepository.markAsCompleted(id)

    return new SchedulingDTO(updatedScheduling).toResponse(
      new BarberDTO(updatedScheduling.barber, updatedScheduling.barber.user).toResponse(),
      new ClientDTO(updatedScheduling.client).toResponse(),
      new BarbershopDTO(updatedScheduling.barbershop).toResponse(),
      new TreatmentDTO(updatedScheduling.treatment).toResponse()
    );
  }

  async calculateAvailableTimes(barberId: number, date: Date, treatmentId: number): Promise<Date[]> {
    const treatment = await this.treatmentService.findById(treatmentId);
    const treatmentDuration = treatment.duration * 60 * 1000;

    // Horários de expediente e intervalo de almoço
    const startOfDay = new Date(date);
    startOfDay.setHours(8, 0, 0, 0);  // Início (8 AM)
    const endOfDay = new Date(date);
    endOfDay.setHours(18, 0, 0, 0);   // Fim (6 PM)

    const lunchStart = new Date(date);
    lunchStart.setHours(13, 0, 0, 0); // Início do almoço (1 PM)
    const lunchEnd = new Date(date);
    lunchEnd.setHours(14, 0, 0, 0);   // Fim do almoço (2 PM)

    // Buscando os agendamentos já existentes
    const scheduledAppointments = await this.schedulingRepository.findSchedulesByBarber(barberId, startOfDay, endOfDay);

    const availableTimes: Date[] = [];
    let currentTime = startOfDay.getTime();

    // Verificando intervalos livres
    for (const appointment of scheduledAppointments) {
      const appointmentStart = new Date(appointment.startTime).getTime();
      const appointmentEnd = new Date(appointment.endTime).getTime();

      // Encontre horários disponíveis antes do próximo agendamento
      while (currentTime + treatmentDuration <= appointmentStart) {
        if (
          (currentTime >= lunchStart.getTime() && currentTime < lunchEnd.getTime()) || // Evitar intervalo de almoço
          (currentTime + treatmentDuration > lunchStart.getTime() && currentTime < lunchEnd.getTime()) // Evitar cruzar horário de almoço
        ) {
          currentTime = lunchEnd.getTime(); // Avançar para após o almoço
          continue;
        }

        availableTimes.push(new Date(currentTime));
        currentTime += treatmentDuration;
      }

      // Atualizar o horário atual para o fim do agendamento
      currentTime = Math.max(currentTime, appointmentEnd);
    }

    // Verificar horários após o último agendamento até o fim do expediente
    while (currentTime + treatmentDuration <= endOfDay.getTime()) {
      if (
        (currentTime >= lunchStart.getTime() && currentTime < lunchEnd.getTime()) ||
        (currentTime + treatmentDuration > lunchStart.getTime() && currentTime < lunchEnd.getTime())
      ) {
        currentTime = lunchEnd.getTime();
        continue;
      }

      availableTimes.push(new Date(currentTime));
      currentTime += treatmentDuration;
    }

    return availableTimes;
  }

}

