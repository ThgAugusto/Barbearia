import { CustomError } from "./custom.exception";
import { ZodError } from 'zod';

export class UserAlreadyExistsError extends CustomError {
    constructor() {
        const message = 'O e-mail informado já está associado a uma conta.';
        super(message, 409); 
    }
}

export class UserNotFoundError extends CustomError {
    constructor() {
        const message = 'Não foi possível encontrar o usuário com o identificador fornecido.';
        super(message, 404);  
    }
}

export class BarberWithoutBarbershopIdError extends CustomError {
    constructor() {
        const message = 'Um barbeiro deve estar associado a uma barbearia. O campo "barbershopId" é obrigatório.';
        super(message, 400);  
    }
}