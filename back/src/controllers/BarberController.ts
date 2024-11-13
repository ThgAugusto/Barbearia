import { FastifyRequest, FastifyReply } from 'fastify';
import { BarberService } from '../services/BarberService';
import { Barber } from '../interfaces/Barber';

export class BarberController {
  static async create(req: FastifyRequest<{ Body: Barber }>, res: FastifyReply) {
    try {
      const newBarber = await BarberService.createBarber(req.body);
      res.status(201).send(newBarber);
    } catch (error) {
      if (error instanceof Error) {

        res.status(400).send({ error: error.message });
      } else {
        
        res.status(400).send({ error: 'Unknown error occurred' });
      }
    }
  }
}
