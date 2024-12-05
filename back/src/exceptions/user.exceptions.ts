import { CustomError } from "./custom.exception";
import { ZodError } from 'zod';

export class UserAlreadyExistsErrorEmail extends CustomError {
    constructor() {
        const message = {email: 'O e-mail informado já está associado a uma conta.'};
        super(message, 409); 
    }
}

export class UserAlreadyExistsErrorCpf extends CustomError {
    constructor() {
        const message = {cpf: 'O CPF informado já está associado a uma conta.'}
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

export class NoBarbersFoundError extends CustomError {
    constructor() {
        const message = 'Não foi possível encontrar nenhum barbeiro cadastrada.';
        super(message, 404);  
    }
}

export class NoOwnerFoundError extends CustomError {
    constructor() {
        const message = 'Nenhum proprietário encontrado.';
        super(message, 404);  
    }
}