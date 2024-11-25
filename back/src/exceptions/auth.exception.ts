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

export class AuthSessionExpiredError extends CustomError {
    constructor() {
        const message = 'Sua sessão expirou. Por favor, faça login novamente.';
        super(message, 401);
    }
}

export class AuthInvalidCredentialsError extends CustomError {
    constructor() {
        const message = 'Credenciais inválidas. Verifique suas informações e tente novamente.';
        super(message, 401);
    }
}

export class AuthUnauthorizedError extends CustomError {
    constructor() {
        const message = 'Você não tem permissão para realizar esta ação.';
        super(message, 403); 
    }
}