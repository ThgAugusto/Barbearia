import { CustomError } from "./custom.exception";
import { ZodError } from 'zod';

export class BarbershopAlreadyExistsError extends CustomError {
    constructor() {
        const message = 'A barbearia com o CNPJ informado já está cadastrada.'
        super(message, 409);
    }
}

export class BarbershopNotFoundError extends CustomError {
    constructor() {
        const message = 'Não foi possível encontrar a barbearia com o identificador fornecido.';
        super(message, 404,);
    }
}


