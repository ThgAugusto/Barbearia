import { FastifyReply } from 'fastify';
import { CustomError } from '../../exceptions/custom.exception';

export class ErrorHandler {
    static handleError(error: Error, reply: FastifyReply): void {
        if (error instanceof CustomError) {
            reply.status(error.statusCode).send({
                message: error.message,
                ...(error.details && { error: error.details })
            });
        } else if (error instanceof Error) {
            reply.status(500).send({
                message: 'Erro interno ao processar sua solicitação',
                error: error.message,
            });
        } else {
            reply.status(500).send({
                message: 'Erro desconhecido',
                error: 'Ocorreu um erro inesperado no sistema',
            });
        }
    }
}
