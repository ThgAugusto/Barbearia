import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';

export function setupPlugins(server: FastifyInstance): void {
    server.register(fastifyCors, {
        origin: '*',
    });

    server.register(fastifyJwt, {
        secret: 'f185e378b592b4fcce6d686ffafe092bb6d6011edd76be3a9e817fc3045b24d6', 
    });
}
