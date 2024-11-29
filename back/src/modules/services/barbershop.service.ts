import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { BarbershopRepository } from '../repositories/barbershop.repository';
import { CreateBarbershopDTO, UpdateBarbershopDTO, BarbershopResponseDTO, BarbershopDTO } from '../dtos/barbershop.dto';
import { BarbershopAlreadyExistsError, BarbershopNotFoundError } from '../../exceptions/barbershop.exeptions'
import { createBarbershopSchema, updateBarbershopSchema } from '../validations/barbershop.validations';
import { AuthUnauthorizedError } from '../../exceptions/auth.exception';
import { ValidationError } from '../../exceptions/custom.exception';

@AutoRegister()
export class BarbershopService {
  constructor(@inject(BarbershopRepository) private readonly barbershopRepository: BarbershopRepository) { }

  async create(barbershopData: CreateBarbershopDTO, userId: number): Promise<BarbershopResponseDTO> {
    const result = createBarbershopSchema.safeParse(barbershopData);
    if (!result.success) {
      throw new ValidationError(result.error);
    }

    if (!userId) {
      throw new AuthUnauthorizedError();
    }
    
    barbershopData.ownerId = userId;

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

  async findAllByOwner(ownerId: number): Promise<BarbershopResponseDTO[]> {
    const barbershops = await this.barbershopRepository.findAllByOwner(ownerId);
    return barbershops.map(barbershop => new BarbershopDTO(barbershop).toResponse());
  }

  async update(id: number, barbershopData: UpdateBarbershopDTO, userId: number): Promise<BarbershopResponseDTO> {
    const result = updateBarbershopSchema.safeParse(barbershopData);
    if (!result.success) {
      throw new ValidationError(result.error);
    }


    const existingBarbershop = await this.barbershopRepository.findById(id);
    if (!existingBarbershop) {
      throw new BarbershopNotFoundError();
    } else if (existingBarbershop.ownerId !== userId) {
      throw new AuthUnauthorizedError()
    }

    const updatedBarbershop = await this.barbershopRepository.update(id, barbershopData);
    return new BarbershopDTO(updatedBarbershop).toResponse();
  }

  async softDelete(id: number): Promise<BarbershopResponseDTO> {
    const existingBarbershop = await this.barbershopRepository.findById(id);
    if (!existingBarbershop || existingBarbershop.status === "INACTIVE") {
      throw new BarbershopNotFoundError();
    }

    const inactiveBarbershop = await this.barbershopRepository.softDelete(id);
    return new BarbershopDTO(inactiveBarbershop).toResponse();
  }

  async restore(id: number): Promise<BarbershopResponseDTO> {
    const existingBarbershop = await this.barbershopRepository.findById(id);
    if (!existingBarbershop || existingBarbershop.status === "ACTIVE") {
      throw new BarbershopNotFoundError();
    }
    
    const restoredBarbershop = await this.barbershopRepository.restore(id);
    
    return new BarbershopDTO(restoredBarbershop).toResponse();
  }
  
}
