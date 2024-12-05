import { FastifyInstance } from 'fastify';
import { BarberController } from '../modules/controllers/barber.controller';
import { CreateBarberDTO, UpdateBarberDTO } from '../modules/dtos/barber.dto';
import { AutoRegister, inject } from '../utils/auto-register.decorator';
import { authenticate, checkUserRole } from '../core/middlewares/auth.middlewares';

@AutoRegister()
export class BarberRoutes {
  constructor(
    @inject(BarberController) private barberController: BarberController,
    @inject('FastifyInstance') private readonly fastify: FastifyInstance
  ) { }

  public register() {
    const authMiddleware = [authenticate, checkUserRole('OWNER')];

    this.fastify.post<{ Body: CreateBarberDTO }>('/barbers', {
      preHandler: authMiddleware,
    }, async (request, reply) => {
      return this.barberController.create(request, reply);
    });


    this.fastify.get('/barbers/owner', { preHandler: authMiddleware }, async (request, reply) => {
      return this.barberController.findAllByOwnerId(request, reply);
    });

    this.fastify.get<{ Params: { barbershopId: number } }>('/barbers/barbershop/:barbershopId',
      { preHandler: authMiddleware },
      async (request, reply) => {
        return this.barberController.findAllByBarbershopId(request, reply);
      });


    this.fastify.patch<{ Params: { id: number }; Body: UpdateBarberDTO }>('/barbers/:id', async (request, reply) => {
      return this.barberController.update(request, reply);
    });


    this.fastify.delete<{ Params: { id: number } }>('/barbers/:id', async (request, reply) => {
      return this.barberController.softDelete(request, reply);
    });


    this.fastify.patch<{ Params: { id: number } }>('/barbers/:id/restore', async (request, reply) => {
      return this.barberController.restore(request, reply);
    });


    this.fastify.get<{ Params: { id: number } }>('/barbers/:id', async (request, reply) => {
      return this.barberController.findById(request, reply);
    });


  }
}
