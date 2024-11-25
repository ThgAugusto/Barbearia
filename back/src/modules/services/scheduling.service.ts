import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { SchedulingRepository } from '../repositories/scheduling.repository';
import { CreateSchedulingDTO, UpdateSchedulingDTO, SchedulingResponseDTO, SchedulingDTO } from '../dtos/scheduling.dto';
import { BarbershopService } from './barbershop.service';
import { TreatmentService } from './treatment.service';
import { UserService } from './user.service';
import { ClientService } from './client.service';
import { SchedulingBarberNotFoundError,
         SchedulingConflictError,
         SchedulingClientNotFoundError,
         SchedulingBarbershopNotFoundError,
         SchedulingTreatmentNotFoundError,
         SchedulingNotFoundError } from '../../exceptions/scheduling.exceptions';
import { UserDTO } from '../dtos/user.dto';
import { ClientDTO } from '../dtos/client.dto';
import { BarbershopDTO } from '../dtos/barbershop.dto';
import { TreatmentDTO } from '../dtos/treatment.dto';

@AutoRegister()
export class SchedulingService {
  constructor(
    @inject(SchedulingRepository) private readonly schedulingRepository: SchedulingRepository,
    @inject(BarbershopService) private readonly barbershopService: BarbershopService,
    @inject(TreatmentService) private readonly treatmentService: TreatmentService,
    @inject(UserService) private readonly userService: UserService,
    @inject(ClientService) private readonly clientService: ClientService
  ) {}

  async create(schedulingData: CreateSchedulingDTO): Promise<SchedulingResponseDTO> {
    const barbershop = await this.barbershopService.findById(schedulingData.barbershopId);
    if (!barbershop) throw new SchedulingBarbershopNotFoundError();

    const barber = await this.userService.findById(schedulingData.barberId);
    console.log(barber, schedulingData.barberId);
    if (!barber || barber.role !== 'BARBER') throw new SchedulingBarberNotFoundError();

    const treatment = await this.treatmentService.findById(schedulingData.treatmentId);
    if (!treatment) throw new SchedulingTreatmentNotFoundError();

    const client = await this.clientService.findById(schedulingData.clientId);
    if (!client) throw new SchedulingClientNotFoundError();

    const conflictingScheduling = await this.schedulingRepository.findConflictingScheduling(schedulingData);
    if (conflictingScheduling) throw new SchedulingConflictError();

    const createdScheduling = await this.schedulingRepository.create(schedulingData);

    return new SchedulingDTO(createdScheduling).toResponse(
      new UserDTO(createdScheduling.barber).toResponse(),
      new ClientDTO(createdScheduling.client).toResponse(),
      new BarbershopDTO(createdScheduling.barbershop).toResponse(),
      new TreatmentDTO(createdScheduling.treatment).toResponse()
    );
  }

  async findById(id: number): Promise<SchedulingResponseDTO> {
    const scheduling = await this.schedulingRepository.findById(id);
    if (!scheduling) throw new SchedulingNotFoundError();

    return new SchedulingDTO(scheduling).toResponse(
      new UserDTO(scheduling.barber).toResponse(),
      new ClientDTO(scheduling.client).toResponse(),
      new BarbershopDTO(scheduling.barbershop).toResponse(),
      new TreatmentDTO(scheduling.treatment).toResponse()
    );
  }

  async findAll(): Promise<SchedulingResponseDTO[]> {
    const schedulings = await this.schedulingRepository.findAll();
    return schedulings.map((scheduling) =>
      new SchedulingDTO(scheduling).toResponse(
        new UserDTO(scheduling.barber).toResponse(),
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
      new UserDTO(updatedScheduling.barber).toResponse(),
      new ClientDTO(updatedScheduling.client).toResponse(),
      new BarbershopDTO(updatedScheduling.barbershop).toResponse(),
      new TreatmentDTO(updatedScheduling.treatment).toResponse()
    );
  }

  async softDelete(id: number): Promise<void> {
    const existingScheduling = await this.schedulingRepository.findById(id);
    if (!existingScheduling) throw new SchedulingNotFoundError();

    await this.schedulingRepository.softDelete(id);
  }
}
