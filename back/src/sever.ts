import 'reflect-metadata'; 
import { FastifyServer } from './core/sever/fastify-sever';

async function startServer(): Promise<void> {
    const fastifyServer = new FastifyServer(); 
    await fastifyServer.configure();  
    const port = Number(process.env.PORT) || 3000;

    try {
        await fastifyServer.start(); 
        console.log(`Servidor rodando em http://localhost:${port}`);
    } catch (err) {
        console.error('Erro ao iniciar o servidor:', err);
        process.exit(1);
    }
}

startServer();
