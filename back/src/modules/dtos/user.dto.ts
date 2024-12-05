import { Role, User, Status } from '@prisma/client';

export class UserDTO {
    id: number;
    name: string;
    email: string;
    password: string;
    cpf: string;
    role: Role;
    status: Status;

    constructor(user: User) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.cpf = user.cpf;
        this.role = user.role;
        this.status = user.status;
    }

    toResponse() {
        const { password, ...userResponse } = this;
        return userResponse;
    }
}

export type CreateUserDTO = Omit<UserDTO, 'id' | 'status' | 'toResponse'>;

export type UpdateUserDTO = Partial<Omit<UserDTO, 'id' | 'status' |  'toResponse'>>;

export type UserResponseDTO = ReturnType<UserDTO['toResponse']>;