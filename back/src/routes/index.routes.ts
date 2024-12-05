import { FastifyInstance } from 'fastify';
import { container } from 'tsyringe';
import { BarberRoutes } from './barber.routes';
import { AuthRoutes } from './auth.routes';
import { BarbershopRoutes } from './barbershop.routes';
import { TreatmentRoutes } from './treatment.routes';
import { ClientRoutes } from './client.routes';
import { SchedulingRoutes } from './scheduling.routes';
import { OwnerRoutes } from './owner.routes';

export class Routes {
  constructor(private fastify: FastifyInstance) {
    container.registerInstance('FastifyInstance', this.fastify);
  }

  public register() {
    try {
      const ownerRoutes = container.resolve(OwnerRoutes);
      ownerRoutes.register();

      const barberRoutes = container.resolve(BarberRoutes);
      barberRoutes.register();

      const authRoutes = container.resolve(AuthRoutes);
      authRoutes.register();

      const barbershopRoutes = container.resolve(BarbershopRoutes);
      barbershopRoutes.register()

      const treatmentRoutes = container.resolve(TreatmentRoutes);
      treatmentRoutes.register()

      const clientRoutes = container.resolve(ClientRoutes);
      clientRoutes.register()

      const schedulingRoutes = container.resolve(SchedulingRoutes);
      schedulingRoutes.register()

    } catch (error) {
      console.error('Error ao registrar rotas:', error);
    }
  }
}
