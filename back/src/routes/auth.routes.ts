import { FastifyInstance } from 'fastify';
import { injectable, inject } from 'tsyringe';
import { AuthController } from '../modules/controllers/auth.controller';
import { AuthDTO } from '../modules/dtos/auth.dto';

@injectable()
export class AuthRoutes {
  constructor(@inject(AuthController) private authController: AuthController) {}

  public register(fastify: FastifyInstance) {
    fastify.post<{ Body: AuthDTO }>('/auth', async (request, reply) => {
      return this.authController.authenticate(request, reply);
    });
  }
}
