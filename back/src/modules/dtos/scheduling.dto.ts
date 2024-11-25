import { SchedulingStatus, Scheduling, } from '@prisma/client';
import { UserResponseDTO } from './user.dto';
import { ClientResponseDTO } from './client.dto';
import { BarbershopResponseDTO } from './barbershop.dto';
import { TreatmentResponseDTO } from './treatment.dto';

export class SchedulingDTO {
    id: number;
    dateTime: Date;
    notes: string | null;
    barberId: number;
    barbershopId: number;
    treatmentId: number;
    clientId: number;
    status: SchedulingStatus;

    constructor(scheduling: Scheduling) {
        this.id = scheduling.id;
        this.dateTime = scheduling.dateTime;
        this.notes = scheduling.notes;
        this.barberId = scheduling.barberId;
        this.barbershopId = scheduling.barbershopId;
        this.status = scheduling.status;
        this.treatmentId = scheduling.treatmentId;
        this.clientId = scheduling.clientId;
    }

    toResponse(
        barber: UserResponseDTO,
        client: ClientResponseDTO,
        barbershop: BarbershopResponseDTO,
        treatment: TreatmentResponseDTO
    ) {
        const { barberId, barbershopId, treatmentId, clientId, ...schedulingWithoutIds } = this;
        return {
            ...schedulingWithoutIds,
            barber,
            client,
            barbershop,
            treatment,
        };
    }
    
}

export type CreateSchedulingDTO = Omit<SchedulingDTO, 'id' | 'status'>

export type UpdateSchedulingDTO = Omit<SchedulingDTO, 'id'>

export type SchedulingResponseDTO = ReturnType<SchedulingDTO['toResponse']>;

