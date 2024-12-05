import { Barbershop, Status } from '@prisma/client';

export class BarbershopDTO {
    id: number;
    socialReason: string;
    tradeName: string | null;
    cnpj: string;
    address: string;
    phoneNumber: string;
    ownerId: number;
    status: Status;

    constructor(barbershop: Barbershop) {
        this.id = barbershop.id;
        this.socialReason = barbershop.socialReason;
        this.tradeName = barbershop.tradeName || null;
        this.cnpj = barbershop.cnpj;
        this.address = barbershop.address;
        this.phoneNumber = barbershop.phoneNumber;
        this.ownerId = barbershop.ownerId;
        this.status = barbershop.status;
    }

    toResponse() {
        return this;
    }
}

export type CreateBarbershopDTO =  Omit<Barbershop, 'id' | 'status' | 'toResponse'> 

export type UpdateBarbershopDTO =  Omit<Barbershop, 'id' | 'status' |  'toResponse'> 

export type BarbershopResponseDTO = ReturnType<BarbershopDTO['toResponse']>;

export type BarbershopInfo = {
        id: number;
        socialReason: string;
        cnpj: string;
}
