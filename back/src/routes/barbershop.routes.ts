import { FastifyInstance } from 'fastify';
import { BarbershopController } from '../modules/controllers/barbershop.controller';
import { CreateBarbershopDTO, UpdateBarbershopDTO } from '../modules/dtos/barbershop.dto';
import { AutoRegister, inject } from '../utils/auto-register.decorator';
import { authenticate, checkUserRole } from '../core/middlewares/auth.middlewares';

@AutoRegister()
export class BarbershopRoutes {
    constructor(
        @inject(BarbershopController) private barbershopController: BarbershopController,
        @inject('FastifyInstance') private readonly fastify: FastifyInstance
    ) { }

    public register() {
        const authMiddleware = [authenticate, checkUserRole('OWNER')];

        this.fastify.post<{ Body: CreateBarbershopDTO }>('/barbershops',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.barbershopController.create(request, reply);
        });

        this.fastify.get('/owner/barbershops',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.barbershopController.findAllByOwner(request, reply);
        });


        this.fastify.get<{ Params: { id: number } }>('/barbershops/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.barbershopController.findById(request, reply);
        });

        this.fastify.patch<{ Params: { id: number }; Body: UpdateBarbershopDTO }>('/barbershops/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.barbershopController.update(request, reply);
        });

        this.fastify.delete<{ Params: { id: number } }>('/barbershops/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.barbershopController.softDelete(request, reply);
        });

        this.fastify.patch<{ Params: { id: number } }>('/barbershops/:id/restore', async (request, reply) => {
            return this.barbershopController.restore(request, reply);
          });
    }
}
