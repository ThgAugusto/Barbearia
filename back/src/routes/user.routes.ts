import { FastifyInstance } from 'fastify';
import { UserController } from '../modules/controllers/user.controller';
import { CreateUserDTO, UpdateUserDTO } from '../modules/dtos/user.dto';
import { AutoRegister, inject } from '../utils/auto-register.decorator';
import { authenticate, checkUserRole } from '../core/middlewares/auth.middlewares';

@AutoRegister()
export class UserRoutes {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject('FastifyInstance') private readonly fastify: FastifyInstance) { }

  public register() {
    const authMiddleware = [authenticate, checkUserRole('OWNER')];

    this.fastify.post<{ Body: CreateUserDTO }>('/users/owner', async (request, reply) => {
      return this.userController.createOwner(request, reply);
    });

    this.fastify.post<{ Body: CreateUserDTO }>('/users/barber', {
      preHandler: authMiddleware,
    },
      async (request, reply) => {
        return this.userController.createBarber(request, reply);
      });

    this.fastify.get<{ Params: { barbershopId: number } }>('/user/barbers/barbershop/:barbershopId', {
      preHandler: authMiddleware,
    }, async (request, reply) => {
      return this.userController.findAllBarbersByBarbershopId(request, reply);
    });

    this.fastify.get('/users', async (request, reply) => {
      return this.userController.findAll(request, reply);
    });

    this.fastify.get<{ Params: { id: number } }>('/users/:id', async (request, reply) => {
      return this.userController.findById(request, reply);
    });

    this.fastify.patch<{ Params: { id: number }; Body: UpdateUserDTO }>('/users/:id', async (request, reply) => {
      return this.userController.update(request, reply);
    });

    this.fastify.delete<{ Params: { id: number } }>('/users/:id', async (request, reply) => {
      return this.userController.softDelete(request, reply);
    });

    this.fastify.patch<{ Params: { id: number } }>('/users/:id/restore', async (request, reply) => {
      return this.userController.restore(request, reply);
    });
  }
}
