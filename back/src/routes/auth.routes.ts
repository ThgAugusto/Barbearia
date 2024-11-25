import { FastifyInstance } from 'fastify';
import { AuthController } from '../modules/controllers/auth.controller';
import { AuthDTO } from '../modules/dtos/auth.dto';
import { AutoRegister, inject } from '../utils/auto-register.decorator';

@AutoRegister()
export class AuthRoutes {
  constructor(
    @inject(AuthController) private authController: AuthController,
    @inject('FastifyInstance') private readonly fastify: FastifyInstance) {}

  public register() {
    this.fastify.post<{ Body: AuthDTO }>('/auth', async (request, reply) => {
      return this.authController.authenticate(request, reply);
    });
  }
}
