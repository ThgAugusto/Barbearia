import { SchedulingStatus, Scheduling, } from '@prisma/client';
import { ClientResponseDTO } from './client.dto';
import { BarbershopResponseDTO } from './barbershop.dto';
import { TreatmentResponseDTO } from './treatment.dto';
import { BarberResponseDTO } from './barber.dto';

export class SchedulingDTO {
    id: number;
    startTime: Date;
    endTime: Date;
    notes: string | null;
    barberId: number;
    barbershopId: number;
    treatmentId: number;
    clientId: number;
    status: SchedulingStatus;

    constructor(scheduling: Scheduling) {
        this.id = scheduling.id;
        this.startTime = scheduling.startTime;
        this.endTime = scheduling.endTime;
        this.notes = scheduling.notes;
        this.barberId = scheduling.barberId;
        this.barbershopId = scheduling.barbershopId;
        this.status = scheduling.status;
        this.treatmentId = scheduling.treatmentId;
        this.clientId = scheduling.clientId;
    }

    toResponse(
        barber: BarberResponseDTO,
        client: ClientResponseDTO,
        barbershop: BarbershopResponseDTO,
        treatment: TreatmentResponseDTO
    ) {
       
        return {
            ...this,
            barber,
            client,
            barbershop,
            treatment,
        };
    }
    
}

export type CreateSchedulingDTO = Omit<SchedulingDTO, 'id' | 'status' |  'toResponse'>

export type UpdateSchedulingDTO = Omit<SchedulingDTO, 'id' | 'toResponse'>

export type SchedulingResponseDTO = ReturnType<SchedulingDTO['toResponse']>;

