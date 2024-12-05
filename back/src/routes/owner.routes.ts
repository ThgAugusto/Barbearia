import { FastifyInstance } from 'fastify';
import { OwnerController } from '../modules/controllers/owner.controller';
import { CreateOwnerDTO, UpdateOwnerDTO } from '../modules/dtos/owner.dto';
import { AutoRegister, inject } from '../utils/auto-register.decorator';
import { authenticate, checkUserRole } from '../core/middlewares/auth.middlewares';

@AutoRegister()
export class OwnerRoutes {
    constructor(
        @inject(OwnerController) private ownerController: OwnerController,
        @inject('FastifyInstance') private readonly fastify: FastifyInstance
    ) { }

    public register() {
        const authMiddleware = [authenticate, checkUserRole('OWNER')];

        this.fastify.post<{ Body: CreateOwnerDTO }>('/owners',
            async (request, reply) => {
                return this.ownerController.create(request, reply);
            });

        this.fastify.get('/owners', { preHandler: authMiddleware }, async (request, reply) => {
            return this.ownerController.findAll(request, reply);
        });

        this.fastify.get<{ Params: { id: number } }>('/owners/:id', async (request, reply) => {
            return this.ownerController.findById(request, reply);
        });

        this.fastify.patch<{ Params: { id: number }; Body: UpdateOwnerDTO }>('/owners/:id', async (request, reply) => {
            return this.ownerController.update(request, reply);
        });

        this.fastify.delete<{ Params: { id: number } }>('/owners/:id', async (request, reply) => {
            return this.ownerController.softDelete(request, reply);
        });

        this.fastify.patch<{ Params: { id: number } }>('/owners/:id/restore', async (request, reply) => {
            return this.ownerController.restore(request, reply);
        });
    }
}
