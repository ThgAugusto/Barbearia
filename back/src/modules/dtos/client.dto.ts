import { Client, Status } from '@prisma/client';

export class ClientDTO {
    id: number;
    name: string;
    phone: string;
    email: string
    notes: string | null;
    status: Status;


    constructor(client: Client) {
        this.id = client.id;
        this.name = client.name;
        this.phone = client.phone;
        this.email = client.email;
        this.notes = client.notes || null;
        this.status = client.status;
    }

    toResponse() {
        const { status, ...clientResponse } = this;  
        return clientResponse;
    }
}

export type CreateClientDTO = Omit<ClientDTO, 'id' | 'status'>;

export type UpdateClientDTO = Partial<Omit<ClientDTO, 'id' | 'status'>>;

export type ClientResponseDTO =  ReturnType<ClientDTO['toResponse']>;
