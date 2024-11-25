import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { BarbershopRepository } from '../repositories/barbershop.repository';
import { CreateBarbershopDTO, UpdateBarbershopDTO, BarbershopResponseDTO, BarbershopDTO } from '../dtos/barbershop.dto';
import { BarbershopAlreadyExistsError, BarbershopNotFoundError, BarbershopValidationError } from '../../exceptions/barbershop.exeptions'
import { createBarbershopSchema, updateBarbershopSchema } from '../validations/barbershop.validations';
import { AuthUnauthorizedError } from '../../exceptions/auth.exception';

@AutoRegister()
export class BarbershopService {
  constructor(@inject(BarbershopRepository) private readonly barbershopRepository: BarbershopRepository) { }

  async create(barbershopData: CreateBarbershopDTO, userId: number): Promise<BarbershopResponseDTO> { 
    const result = createBarbershopSchema.safeParse(barbershopData);
    if (!result.success) {
      throw new BarbershopValidationError(result.error);
    }

    if (barbershopData.ownerId !== userId) {
      throw new AuthUnauthorizedError();
    }

    const existingBarbershop = await this.barbershopRepository.findByCnpj(barbershopData.cnpj);
    if (existingBarbershop) {
      throw new BarbershopAlreadyExistsError();
    }

    const createdBarbershop = await this.barbershopRepository.create(barbershopData);
    return new BarbershopDTO(createdBarbershop).toResponse();
  }

  async findById(id: number): Promise<BarbershopResponseDTO> {
    const barbershop = await this.barbershopRepository.findById(id);
    if (!barbershop) {
      throw new BarbershopNotFoundError();
    }

    return new BarbershopDTO(barbershop).toResponse();
  }

  async findAll(): Promise<BarbershopResponseDTO[]> {
    const barbershops = await this.barbershopRepository.findAll();
    return barbershops.map(barbershop => new BarbershopDTO(barbershop).toResponse());
  }

  async update(id: number, barbershopData: UpdateBarbershopDTO, userId: number): Promise<BarbershopResponseDTO> {
    const result = updateBarbershopSchema.safeParse(barbershopData);
    if (!result.success) {
      throw new BarbershopValidationError(result.error);
    }

    if (barbershopData.ownerId !== userId) {
        throw new AuthUnauthorizedError()
      }

    const existingBarbershop = await this.barbershopRepository.findById(id);
    if (!existingBarbershop) {
      throw new BarbershopNotFoundError();
    }

    const updatedBarbershop = await this.barbershopRepository.update(id, barbershopData);
    return new BarbershopDTO(updatedBarbershop).toResponse();
  }

  async softDelete(id: number): Promise<void> {
    const existingBarbershop = await this.barbershopRepository.findById(id);
    if (!existingBarbershop || existingBarbershop.status === "INACTIVE") {
      throw new BarbershopNotFoundError();
    }

    await this.barbershopRepository.softDelete(id);
  }
}
