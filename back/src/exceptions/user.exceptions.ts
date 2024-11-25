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

export class UserValidationError extends CustomError {
    constructor(error: ZodError) {
        const message = 'Erro de validação de usuário';
        super(message, 400, error.flatten().fieldErrors);  
    }
}
