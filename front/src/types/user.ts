export interface User{
    id: number;
    name: string;
    email: string;
    password: string;
    cpf: string;
    status: 'ACTIVE' | 'INACTIVE';
}

export type Create = Omit<User, 'id' | 'status'>;