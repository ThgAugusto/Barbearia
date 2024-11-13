import { FastifyInstance } from 'fastify';
import { BarberController } from '../controllers/BarberController';
import { validateBarber } from '../middlewares/validateBarber';

export async function barberRoutes(app: FastifyInstance) {
  app.post('/barbers', { preHandler: [validateBarber] }, BarberController.create);
}
