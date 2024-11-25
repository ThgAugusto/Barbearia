import { CustomError } from "./custom.exception";
import { ZodError } from 'zod';

export class SchedulingAlreadyExistsError extends CustomError {
    constructor() {
        const message = 'Já existe um agendamento para essa data e hora.';
        super(message, 409);  
    }
}

export class SchedulingNotFoundError extends CustomError {
    constructor() {
        const message = 'Não foi possível encontrar o agendamento com o identificador fornecido.';
        super(message, 404);  
    }
}

export class SchedulingValidationError extends CustomError {
    constructor(error: ZodError) {
        const message = 'Erro de validação de agendamento';
        super(message, 400, error.format());
    }
}

export class SchedulingConflictError extends CustomError {
    constructor() {
        const message = 'Há um conflito com o agendamento, possivelmente com o barbeiro ou horário.';
        super(message, 409);  
    }
}

export class SchedulingStatusInvalidError extends CustomError {
    constructor() {
        const message = 'O status do agendamento é inválido.';
        super(message, 400);  
    }
}

export class SchedulingClientNotFoundError extends CustomError {
    constructor() {
        const message = 'Não foi possível encontrar o cliente com o identificador fornecido.';
        super(message, 404);  
    }
}

export class SchedulingBarbershopNotFoundError extends CustomError {
    constructor() {
        const message = 'Não foi possível encontrar a barbearia com o identificador fornecido.';
        super(message, 404);  
    }
}

export class SchedulingBarberNotFoundError extends CustomError {
    constructor() {
        const message = 'Não foi possível encontrar o barbeiro com o identificador fornecido.';
        super(message, 404);  
    }
}

export class SchedulingTreatmentNotFoundError extends CustomError {
    constructor() {
        const message = 'Não foi possível encontrar o tratamento com o identificador fornecido.';
        super(message, 404);  
    }
}
