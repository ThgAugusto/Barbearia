import { FastifyInstance } from 'fastify';
import { SchedulingController } from '../modules/controllers/scheduling.controller';
import { CreateSchedulingDTO, UpdateSchedulingDTO } from '../modules/dtos/scheduling.dto';
import { AutoRegister, inject } from '../utils/auto-register.decorator';
import { authenticate, checkUserRole } from '../core/middlewares/auth.middlewares';

@AutoRegister()
export class SchedulingRoutes {
    constructor(
        @inject(SchedulingController) private schedulingController: SchedulingController,
        @inject('FastifyInstance') private readonly fastify: FastifyInstance
    ) { }

    public register() {
        const authMiddleware = [authenticate];

        this.fastify.post<{ Body: CreateSchedulingDTO }>('/scheduling',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.schedulingController.create(request, reply);
            });

        this.fastify.get('/owner/scheduling',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.schedulingController.findAllByOwner(request, reply);
            });
            
        this.fastify.get('/scheduling',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.schedulingController.findAll(request, reply);
            });

        this.fastify.get<{ Params: { id: number } }>('/scheduling/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.schedulingController.findById(request, reply);
            });

        this.fastify.patch<{ Params: { id: number }; Body: UpdateSchedulingDTO }>('/scheduling/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.schedulingController.update(request, reply);
            });

        this.fastify.delete<{ Params: { id: number } }>('/scheduling/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.schedulingController.softDelete(request, reply);
            });


        this.fastify.patch<{ Params: { id: number } }>('/scheduling/:id/complete',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.schedulingController.markAsCompleted(request, reply);
            });

        this.fastify.get<{ Querystring: { barberId: number; date: string; treatmentId: number } }>(
            '/scheduling/available-times',
            { preHandler: authMiddleware },
            async (request, reply) => this.schedulingController.calculateAvailableTimes(request, reply)
        );
    }
}
