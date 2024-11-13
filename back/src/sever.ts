import Fastify from 'fastify';
import { barberRoutes } from './routes/barberRoutes';

const app = Fastify();

app.register(barberRoutes);

app.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  console.log(`Server is running at ${address}`);
});