import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { UserRoutes } from './user.routes';
import { AuthRoutes } from './auth.routes';

export class Routes {
    constructor(private fastify: FastifyInstance) {}

    public register() {
        try {
            const userRoutes = container.resolve(UserRoutes);
            userRoutes.register(this.fastify);

            const authRoutes = container.resolve(AuthRoutes);
            authRoutes.register(this.fastify);
        } catch (error) {
            console.error('Error ao registrar rotas:', error);
        }
    }
}
