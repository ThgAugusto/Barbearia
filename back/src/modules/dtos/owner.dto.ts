import { Owner, User } from "@prisma/client";
import { CreateUserDTO, UserDTO } from "./user.dto";

export class OwnerDTO {
    id: number;
    user: UserDTO;
    phoneNumber: string;

    constructor(owner: Owner, user: User) {
        this.id = owner.id;
        this.phoneNumber = owner.phoneNumber;
        this.user = new UserDTO(user);
    }

    toResponse() {
        return {
            ...this,
            user: this.user.toResponse(),
        };
    }
}

export type CreateOwnerDTO = {
    user: CreateUserDTO;
    phoneNumber: string;
};

export type UpdateOwnerDTO = {
    user: Partial<CreateUserDTO>;
    phoneNumber?: string;
};

export type OwnerResponseDTO = ReturnType<OwnerDTO['toResponse']>;
