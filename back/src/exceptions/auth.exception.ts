import { ZodError } from 'zod';
import { CustomError } from './custom.exception';


export class IncorrectPasswordError extends CustomError {
    constructor() {
        const message = {
            password: 'Senha inválida. Verifique e tente novamente.'
        };
        super(message, 401);
    }
}


export class AuthEmailNotFoundError extends CustomError {
    constructor() {
        const message = {
            email: 'O email não está associado a nenhuma conta.'
        
        };
        super(message, 404);
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

export class AuthAlreadyLoggedInError extends CustomError {
    constructor(message: string = 'Usuário já está logado.') {
        super(message, 400);
    }
}