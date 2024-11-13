import { FastifyRequest, FastifyReply } from 'fastify';
import { Barber } from '../interfaces/Barber';

export async function validateBarber(req: FastifyRequest<{ Body: Barber }>, res: FastifyReply) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      error: `Campo(s) obrigatório(s) ausente(s)`,
    });
  }
}
