import { FastifyInstance } from 'fastify';
import { UserController } from '../modules/controllers/user.controller';
import { CreateUserDTO, UpdateUserDTO } from '../modules/dtos/user.dto';
import { AutoRegister, inject } from '../utils/auto-register.decorator';

@AutoRegister()
export class UserRoutes {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject('FastifyInstance') private readonly fastify: FastifyInstance) { }

  public register() {
    this.fastify.post<{ Body: CreateUserDTO }>('/users', async (request, reply) => {
      return this.userController.create(request, reply);
    });

    this.fastify.get('/users', async (request, reply) => {
      return this.userController.findAll(request, reply);
    });

    this.fastify.get<{ Params: { id: number } }>('/users/:id', async (request, reply) => {
      return this.userController.findById(request, reply);
    });

    this.fastify.put<{ Params: { id: number }; Body: UpdateUserDTO }>('/users/:id', async (request, reply) => {
      return this.userController.update(request, reply);
    });

    this.fastify.delete<{ Params: { id: number } }>('/users/:id', async (request, reply) => {
      return this.userController.softDelete (request, reply);
    });
  }
}
