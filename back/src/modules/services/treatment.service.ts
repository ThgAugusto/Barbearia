import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { TreatmentRepository } from '../repositories/treatment.repository';
import { CreateTreatmentDTO, UpdateTreatmentDTO, TreatmentResponseDTO, TreatmentDTO } from '../dtos/treatment.dto';
import { NoTreatmentsFoundError, TreatmentNotFoundError } from '../../exceptions/treatment.exceptions';
import { createTreatmentSchema, updateTreatmentSchema } from '../validations/treatment.validations';
import { BarbershopService } from './barbershop.service';
import { AuthUnauthorizedError } from '../../exceptions/auth.exception';
import { ValidationError } from '../../exceptions/custom.exception';

@AutoRegister()
export class TreatmentService {
  constructor(
    @inject(TreatmentRepository) private readonly treatmentRepository: TreatmentRepository,
    @inject(BarbershopService) private readonly barbershopService: BarbershopService
  ) { }

  async create(treatmentData: CreateTreatmentDTO, userId: number): Promise<TreatmentResponseDTO> {
    const result = createTreatmentSchema.safeParse(treatmentData);
    if (!result.success) {
      throw new ValidationError(result.error);
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


  async findAllByBarbershopId(id: number): Promise<TreatmentResponseDTO[]> {
    const treatments = await this.treatmentRepository.findAllByBarbershopId(id);

    if (!treatments || treatments.length === 0) {
        throw new NoTreatmentsFoundError();
    }

    return treatments.map(treatment =>
        new TreatmentDTO(treatment).toResponse()
    );
}

  async findAll(): Promise<TreatmentResponseDTO[]> {
    const treatments = await this.treatmentRepository.findAll();
    if (!treatments) {
      throw new TreatmentNotFoundError();
    }
    
    return treatments.map(treatment => new TreatmentDTO(treatment).toResponse());
  }

  async update(id: number, treatmentData: UpdateTreatmentDTO, userId: number): Promise<TreatmentResponseDTO> {
    const result = updateTreatmentSchema.safeParse(treatmentData);
    if (!result.success) {
      throw new ValidationError(result.error);
    }

    const existingTreatment = await this.treatmentRepository.findById(id);
    if (!existingTreatment) {
      throw new TreatmentNotFoundError();
    }


    const updatedTreatment = await this.treatmentRepository.update(id, treatmentData);
    return new TreatmentDTO(updatedTreatment).toResponse();
  }

  async softDelete(id: number): Promise<TreatmentResponseDTO> {
    const existingTreatment = await this.treatmentRepository.findById(id);
    if (!existingTreatment || existingTreatment.status === 'INACTIVE') {
      throw new TreatmentNotFoundError();
    }

   const inactiveTreatment =  await this.treatmentRepository.softDelete(id);
   return new TreatmentDTO(inactiveTreatment).toResponse();
  }


  async restore(id: number): Promise<TreatmentResponseDTO> {
    const existingTreatment = await this.treatmentRepository.findById(id);
    if (!existingTreatment || existingTreatment.status === 'ACTIVE') {
      throw new TreatmentNotFoundError();
    }

    const restoredTreatment = await this.treatmentRepository.restore(id);
    return new TreatmentDTO(restoredTreatment).toResponse();

  }
}
