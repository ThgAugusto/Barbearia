import { FastifyInstance } from 'fastify';
import { AuthController } from '../modules/controllers/auth.controller';
import { AuthDTO } from '../modules/dtos/auth.dto';
import { AutoRegister, inject } from '../utils/auto-register.decorator';
import { authenticate, preventAlreadyAuthenticated } from '../core/middlewares/auth.middlewares';

@AutoRegister()
export class AuthRoutes {
  constructor(
    @inject(AuthController) private authController: AuthController,
    @inject('FastifyInstance') private readonly fastify: FastifyInstance) {}

  public register() {
    this.fastify.post<{ Body: AuthDTO }>('/auth', { preHandler: preventAlreadyAuthenticated }, async (request, reply) => {
      return this.authController.authenticate(request, reply);
    });

    this.fastify.get('/auth/verify', { preHandler: authenticate }, async (request, reply) => {
      const token = request.cookies['token']; 
      return { success: true, token}; 
    });
  }
}
