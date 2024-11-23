import { FastifyInstance } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { UserController } from '../modules/controllers/user.controller';
import { CreateUserDTO, UpdateUserDTO } from '../modules/dtos/user.dto';

@injectable()
export class UserRoutes {
  constructor(@inject(UserController) private userController: UserController) { }

  public register(fastify: FastifyInstance) {
    fastify.post<{ Body: CreateUserDTO }>('/users', async (request, reply) => {
      return this.userController.create(request, reply);
    });

    fastify.get('/users', async (request, reply) => {
      return this.userController.findAll(request, reply);
    });

    fastify.get<{ Params: { id: number } }>('/users/:id', async (request, reply) => {
      return this.userController.findById(request, reply);
    });

    fastify.put<{ Params: { id: number }; Body: UpdateUserDTO }>('/users/:id', async (request, reply) => {
      return this.userController.update(request, reply);
    });

    fastify.delete<{ Params: { id: number } }>('/users/:id', async (request, reply) => {
      return this.userController.delete(request, reply);
    });
  }
}
