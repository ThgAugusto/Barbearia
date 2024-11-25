import { FastifyInstance } from 'fastify';
import { TreatmentController } from '../modules/controllers/treatment.controller';
import { CreateTreatmentDTO, UpdateTreatmentDTO } from '../modules/dtos/treatment.dto';
import { AutoRegister, inject } from '../utils/auto-register.decorator';
import { authenticate, checkUserRole } from '../core/middlewares/auth.middlewares';

@AutoRegister()
export class TreatmentRoutes {
    constructor(
        @inject(TreatmentController) private treatmentController: TreatmentController,
        @inject('FastifyInstance') private readonly fastify: FastifyInstance
    ) { }

    public register() {
        const authMiddleware = [authenticate];

        this.fastify.post<{ Body: CreateTreatmentDTO }>('/treatments',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.treatmentController.create(request, reply);
            });

        this.fastify.get('/treatments',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.treatmentController.findAll(request, reply);
            });

        this.fastify.get<{ Params: { id: number } }>('/treatments/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.treatmentController.findById(request, reply);
            });

        this.fastify.patch<{ Params: { id: number }; Body: UpdateTreatmentDTO }>('/treatments/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.treatmentController.update(request, reply);
            });

        this.fastify.delete<{ Params: { id: number } }>('/treatments/:id',
            { preHandler: authMiddleware },
            async (request, reply) => {
                return this.treatmentController.softDelete(request, reply);
            });
    }
}
