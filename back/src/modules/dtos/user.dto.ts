import { Role, User } from '@prisma/client';

class UserDTO {
    id: number;
    name: string;
    email: string;
    password: string;
    role: Role;
    barbershopId?: number | null;

    constructor(user: User) {
        this.id = user.id
        this.name = user.name
        this.email = user.email 
        this.password = user.password
        this.role = user.role 
        this.barbershopId = user.barbershopId 
    }
}

export class CreateUserDTO extends UserDTO {  
    constructor(user:User) {
        super(user);
    }
}

export class UpdateUserDTO extends UserDTO {
    constructor(user: Partial<User>) {
        super(user as User);
    }
}

export class UserResponseDTO extends UserDTO {
    constructor(user: User) {
        super(user);
        delete (this as any).password;
    }
}
