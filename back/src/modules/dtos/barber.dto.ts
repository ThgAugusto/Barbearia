import { Barber, User } from "@prisma/client";
import { CreateUserDTO, UserDTO } from "./user.dto";
import {  BarbershopInfo } from "./barbershop.dto";

export class BarberDTO {
    id: number;
    user: UserDTO;
    barbershopId: number;
    userId: number;

    constructor(barber: Barber, user: User) {
        this.id = barber.id;
        this.barbershopId = barber.barbershopId;
        this.userId = user.id;
        this.user = new UserDTO(user);
    }

    toResponse(barbershop?: BarbershopInfo) {
        return {
           ...this,
            user: this.user.toResponse(),
            barbershop
        };
    }
}

export type CreateBarberDTO = {
    user: CreateUserDTO;
    barbershopId: number;
};

export type UpdateBarberDTO = {
    user: Partial<CreateUserDTO>;
    barbershopId?: number;
};

export type BarberResponseDTO = ReturnType<BarberDTO['toResponse']>;
