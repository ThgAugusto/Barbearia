import { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt from '@fastify/jwt';
import { fastifyCookie } from '@fastify/cookie';


export function setupPlugins(server: FastifyInstance): void {
    server.register(fastifyCors, {
        origin: 'http://localhost:5173',
        credentials: true,
    });

    server.register(fastifyCookie, {
        secret: '',
        parseOptions: {
        }
    });
    
    server.register(fastifyJwt, {
        secret: 'Tz8JvQk2!7XxCm@r5PzVd1Wq+9Fb2KzUe@L1mYx8KoVdBz3LzA!V0eF2HtQ9E&',
        cookie: {
            cookieName: 'token',
            signed: false,
        }
    });


}
