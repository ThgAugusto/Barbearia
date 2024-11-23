import { CustomError } from "./custom.exception";
import { ZodError } from 'zod';

export class UserAlreadyExistsError extends CustomError {
    constructor(message: string, details?: any) {
        super(message, 409, details); 
    }
}

export class UserNotFoundError extends CustomError {
    constructor(message: string, details?: any) {
        super(message, 404, details);  
    }
}

export class UserValidationError extends CustomError {
    constructor(error: ZodError) {
        const message = 'Erro de validação de usuário';
        super(message, 400, error.flatten().fieldErrors);  
    }
}
