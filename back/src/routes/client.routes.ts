import { FastifyInstance } from 'fastify';
import { ClientController } from '../modules/controllers/client.controller';
import { CreateClientDTO, UpdateClientDTO } from '../modules/dtos/client.dto';
import { AutoRegister, inject } from '../utils/auto-register.decorator';
import { authenticate, checkUserRole } from '../core/middlewares/auth.middlewares';

@AutoRegister()
export class ClientRoutes {
    constructor(
        @inject(ClientController) private clientController: ClientController,
        @inject('FastifyInstance') private readonly fastify: FastifyInstance
    ) { }

    public register() {
        const authMiddleware = [authenticate, checkUserRole('OWNER')];

        this.fastify.post<{ Body: CreateClientDTO }>('/clients',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.clientController.create(request, reply);
            });

        this.fastify.get('/clients',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.clientController.findAll(request, reply);
            });


        this.fastify.get('/clients/owner',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.clientController.findAllByOwnerId(request, reply);
            });

        this.fastify.get<{ Params: { barbershopId: number } }>('/clients/barbershop/:barbershopId',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.clientController.findAllByBarbershopId(request, reply);
            });

        this.fastify.get<{ Params: { id: number } }>('/clients/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.clientController.findById(request, reply);
            });

        this.fastify.patch<{ Params: { id: number }; Body: UpdateClientDTO }>('/clients/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.clientController.update(request, reply);
            });

        this.fastify.delete<{ Params: { id: number } }>('/clients/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.clientController.softDelete(request, reply);
            });


        this.fastify.patch<{ Params: { id: number } }>('/clients/:id/restore',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.clientController.restore(request, reply);
            });
    }
}
