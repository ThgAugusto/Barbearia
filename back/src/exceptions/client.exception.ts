import { CustomError } from "./custom.exception";
import { ZodError } from 'zod';

export class ClientEmailAlreadyExistsError extends CustomError {
    constructor() {
        const message = 'O e-mail fornecido já está cadastrado para outro cliente.';
        super(message, 409);
    }
}

export class ClientNotFoundError extends CustomError {
    constructor() {
        const message = 'Não foi possível encontrar o cliente com o identificador fornecido.';
        super(message, 404);
    }
}

export class ClientValidationError extends CustomError {
    constructor(error: ZodError) {
        const message = 'Erro de validação dos dados do cliente.';
        super(message, 400, error.format());
    }
}
