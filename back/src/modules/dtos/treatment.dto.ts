import { Treatment, Status } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class TreatmentDTO {
    id: number;
    name: string;
    price: Decimal;
    duration: number;
    description: string | null;
    barbershopId: number;
    status: Status;

    constructor(treatment: Treatment) {
        this.id = treatment.id;
        this.name = treatment.name;
        this.price = treatment.price;
        this.duration = treatment.duration;
        this.description = treatment.description;
        this.barbershopId = treatment.barbershopId;
        this.status = treatment.status;
    }

    toResponse() {
        const { status, ...treatmentResponse } = this;  
        return treatmentResponse;
    }
}

export type CreateTreatmentDTO = Omit<TreatmentDTO, 'id' | 'status'>;

export type UpdateTreatmentDTO = Partial<Omit<TreatmentDTO, 'id' | 'status' | 'barbershopId'>>;

export type TreatmentResponseDTO = ReturnType<TreatmentDTO['toResponse']>;