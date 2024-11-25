import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { TreatmentRepository } from '../repositories/treatment.repository';
import { CreateTreatmentDTO, UpdateTreatmentDTO, TreatmentResponseDTO, TreatmentDTO } from '../dtos/treatment.dto';
import { TreatmentNotFoundError, TreatmentValidationError } from '../../exceptions/treatment.exceptions';
import { createTreatmentSchema, updateTreatmentSchema } from '../validations/treatment.validations';
import { BarbershopService } from './barbershop.service';
import { AuthUnauthorizedError } from '../../exceptions/auth.exception';

@AutoRegister()
export class TreatmentService {
  constructor(
    @inject(TreatmentRepository) private readonly treatmentRepository: TreatmentRepository,
    @inject(BarbershopService) private readonly barbershopService: BarbershopService
  ) { }

  async create(treatmentData: CreateTreatmentDTO, userId: number): Promise<TreatmentResponseDTO> {
    const result = createTreatmentSchema.safeParse(treatmentData);
    if (!result.success) {
      throw new TreatmentValidationError(result.error);
    }

    const foundBarbershop = await this.barbershopService.findById(treatmentData.barbershopId);
    if (foundBarbershop && foundBarbershop.ownerId !== userId) {
        throw new AuthUnauthorizedError();
    }

    const createdTreatment = await this.treatmentRepository.create(treatmentData);
    return new TreatmentDTO(createdTreatment).toResponse();

  }

  async findById(id: number): Promise<TreatmentResponseDTO> {
    const treatment = await this.treatmentRepository.findById(id);
    if (!treatment) {
      throw new TreatmentNotFoundError();
    }

    return new TreatmentDTO(treatment).toResponse();
  }

  async findAll(): Promise<TreatmentResponseDTO[]> {
    const treatments = await this.treatmentRepository.findAll();
    return treatments.map(treatment => new TreatmentDTO(treatment).toResponse());
  }

  async update(id: number, treatmentData: UpdateTreatmentDTO, userId: number): Promise<TreatmentResponseDTO> {
    const result = updateTreatmentSchema.safeParse(treatmentData);
    if (!result.success) {
      throw new TreatmentValidationError(result.error);
    }
    
    const existingTreatment = await this.treatmentRepository.findById(id);
    if (!existingTreatment) {
      throw new TreatmentNotFoundError();
    }

    const foundBarbershop = await this.barbershopService.findById(existingTreatment.barbershopId);
    if (foundBarbershop && foundBarbershop.ownerId !== userId) {
      throw new AuthUnauthorizedError();
    }

    const updatedTreatment = await this.treatmentRepository.update(id, treatmentData);
    return new TreatmentDTO(updatedTreatment).toResponse();
  }

  async softDelete(id: number): Promise<void> {
    const existingTreatment = await this.treatmentRepository.findById(id);
    if (!existingTreatment || existingTreatment.status === 'INACTIVE') {
      throw new TreatmentNotFoundError();
    }

    await this.treatmentRepository.softDelete(id);
  }
}
