import { CustomError } from "./custom.exception";
import { ZodError } from 'zod';

export class TreatmentAlreadyExistsError extends CustomError {
    constructor() {
        const message = 'O serviço com o mesmo nome  já está cadastrado.';
        super(message, 409);
    }
}

export class TreatmentNotFoundError extends CustomError {
    constructor() {
        const message = 'Não foi possível encontrar o serviço com o identificador fornecido.';
        super(message, 404);
    }
}

export class TreatmentValidationError extends CustomError {
    constructor(error: ZodError) {
        const message = 'Erro de validação de tratamento';
        super(message, 400, error.format());
    }
}
