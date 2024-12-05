import { Client, Status } from '@prisma/client';
import { BarbershopInfo } from './barbershop.dto';

export class ClientDTO {
    id: number;
    name: string;
    phone: string;
    email: string
    notes: string | null;
    barbershopId: number ;
    status: Status;


    constructor(client: Client) {
        this.id = client.id;
        this.name = client.name;
        this.phone = client.phone;
        this.email = client.email;
        this.notes = client.notes || null;
        this.barbershopId = client.barbershopId;
        this.status = client.status;
    }

    toResponse(barbershop?: BarbershopInfo) {
        return {
            ...this,
            barbershop
        }
    }
}

export type CreateClientDTO = Omit<ClientDTO, 'id' | 'status' | 'toResponse'>;

export type UpdateClientDTO = Partial<Omit<ClientDTO, 'id' | 'status' |  'toResponse'>>;

export type ClientResponseDTO = ReturnType<ClientDTO['toResponse']>;
