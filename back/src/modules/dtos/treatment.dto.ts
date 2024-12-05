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
        return this;
    }
}

export type CreateTreatmentDTO = Omit<TreatmentDTO, 'id' | 'status' |  'toResponse'>;

export type UpdateTreatmentDTO = Partial<Omit<TreatmentDTO, 'id' | 'status' | 'barbershopId' | 'toResponse'>>;

export type TreatmentResponseDTO = ReturnType<TreatmentDTO['toResponse']>;