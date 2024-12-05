import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { BarberRepository } from '../repositories/barber.repository';
import { CreateBarberDTO, UpdateBarberDTO, BarberResponseDTO, BarberDTO } from '../dtos/barber.dto';
import { UserNotFoundError, BarberWithoutBarbershopIdError, NoBarbersFoundError, UserAlreadyExistsErrorEmail, UserAlreadyExistsErrorCpf } from '../../exceptions/user.exceptions';
import { ValidationError } from '../../exceptions/custom.exception';
import { BarbershopService } from './barbershop.service';
import { AuthUnauthorizedError } from '../../exceptions/auth.exception';
import { createBarberSchema, updateBarberSchema } from '../validations/barber.validation';
import argon2 from 'argon2';

@AutoRegister()
export class BarberService {
  constructor(
    @inject(BarberRepository) private readonly barberRepository: BarberRepository,
    @inject(BarbershopService) private readonly barbershopService: BarbershopService
  ) { }

  async create(barberData: CreateBarberDTO, userId: number): Promise<BarberResponseDTO> {
    const result = createBarberSchema.safeParse(barberData);
    if (!result.success) {
      throw new ValidationError(result.error);
    }

    if (!barberData.barbershopId) {
      throw new BarberWithoutBarbershopIdError();
    }

    console.log(barberData)
    const existingUserEmail = await this.barberRepository.findByEmail(barberData.user.email);
    console.log('ENTROU', existingUserEmail)
    if (existingUserEmail) {
      throw new UserAlreadyExistsErrorEmail();
    }

    const existingUserCpf = await this.barberRepository.findByCpf(barberData.user.cpf);
    if (existingUserCpf) {
      throw new UserAlreadyExistsErrorCpf();
    }


    const barbershop = await this.barbershopService.findById(barberData.barbershopId);
    if (barbershop.ownerId !== userId) {
      throw new AuthUnauthorizedError();
    }

    barberData = result.data;
    barberData.user.password = await argon2.hash(barberData.user.password);

    const createdBarber = await this.barberRepository.create(barberData);
    return new BarberDTO(createdBarber, createdBarber.user).toResponse(createdBarber.barbershop);
  }

  async findById(id: number): Promise<BarberResponseDTO> {
    const barber = await this.barberRepository.findById(id);
    if (!barber) {
      throw new UserNotFoundError();
    }
    return new BarberDTO(barber, barber.user).toResponse(barber.barbershop);
  }

  async findAll(): Promise<BarberResponseDTO[]> {
    const barbers = await this.barberRepository.findAll();

    if (!barbers || barbers.length === 0) {
      throw new NoBarbersFoundError();
    }

    return barbers.map(barber => new BarberDTO(barber, barber.user).toResponse());
  }

  async findAllByOwnerId(ownerId: number): Promise<BarberResponseDTO[]> {
    const barbers = await this.barberRepository.findAllByOwnerId(ownerId);

    if (!barbers || barbers.length === 0) {
      throw new NoBarbersFoundError();
    }

    return barbers.map(barber => new BarberDTO(barber, barber.user).toResponse(barber.barbershop));

  }

  async findAllByBarbershopId(barbershopId: number): Promise<BarberResponseDTO[]> {
    const barbers = await this.barberRepository.findAllByBarbershopId(barbershopId);

    if (!barbers || barbers.length === 0) {
      throw new NoBarbersFoundError();
    }

    return barbers.map(barber => new BarberDTO(barber, barber.user).toResponse(barber.barbershop));
  }

  async update(id: number, barberData: UpdateBarberDTO): Promise<BarberResponseDTO> {
    const result = updateBarberSchema.safeParse(barberData);
    if (!result.success) {
      throw new ValidationError(result.error);
    }

    const existingBarber = await this.barberRepository.findById(id);
    if (!existingBarber) {
      throw new UserNotFoundError();
    }

    if (barberData.user?.email) {
      const existingUserWithEmail = await this.barberRepository.findByEmail(barberData.user.email);
      if (existingUserWithEmail && existingUserWithEmail.id !== existingBarber.userId) {
        throw new UserAlreadyExistsErrorEmail();
      }
    }

    if (barberData.barbershopId) {
      const barbershop = await this.barbershopService.findById(barberData.barbershopId);
      if (!barbershop) {
        throw new UserNotFoundError();
      }
    }

    if (barberData.user.email) {
      const existingUserEmail = await this.barberRepository.findByEmail(barberData.user.email);
      if (existingUserEmail) {
        throw new UserAlreadyExistsErrorEmail();
      }
    }

    if (barberData.user.cpf) {
      const existingUserCpf = await this.barberRepository.findByCpf(barberData.user.cpf);
      if (existingUserCpf) {
        throw new UserAlreadyExistsErrorCpf();
      }
    }


    const updatedBarber = await this.barberRepository.update(id, barberData);
    return new BarberDTO(updatedBarber, updatedBarber.user).toResponse(updatedBarber.barbershop);
  }

  async softDelete(id: number): Promise<BarberResponseDTO> {
    const existingBarber = await this.barberRepository.findById(id);
    if (!existingBarber || existingBarber.user.status === 'INACTIVE') {
      throw new UserNotFoundError();
    }

    const inactiveBarber = await this.barberRepository.softDelete(id);
    return new BarberDTO(inactiveBarber, inactiveBarber.user).toResponse(inactiveBarber.barbershop);
  }

  async restore(id: number): Promise<BarberResponseDTO> {
    const existingBarber = await this.barberRepository.findById(id);
    if (!existingBarber || existingBarber.user.status === 'ACTIVE') {
      throw new UserNotFoundError();
    }

    const restoredBarber = await this.barberRepository.restore(id);
    return new BarberDTO(restoredBarber, restoredBarber.user).toResponse(restoredBarber.barbershop);
  }
}
