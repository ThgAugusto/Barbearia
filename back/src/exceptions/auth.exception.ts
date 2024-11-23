import { ZodError } from 'zod';
import { CustomError } from './custom.exception';

export class AuthValidationError extends CustomError {
    constructor(error: ZodError) {
        const message = 'Erro de validação de autenticação';
        super(message, 400, error.flatten().fieldErrors);  
    }
}


export class IncorrectPasswordError extends CustomError {
    constructor(message: string, details?: any) {
        super(message, 401, details);  
    }
}