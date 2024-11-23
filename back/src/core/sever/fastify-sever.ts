import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { Routes } from '../../routes/routes';  
import { setupPlugins } from '../plugins/plugins';
import { ErrorHandler } from '../errors/error-handler';

export class FastifyServer {
  private server: FastifyInstance;

  constructor() {
    this.server = Fastify(); 
  }

  public async configure() {
    this.setupPlugins();  
    this.setupRoutes();   
    this.setupErrorHandler();
  }

  private setupPlugins() {
    setupPlugins(this.server);
  }

  private setupRoutes() {
    const routes = new Routes(this.server)
    routes.register();  
  }

  private setupErrorHandler() {
    this.server.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
      ErrorHandler.handleError(error, reply);
    });
  }

  public async start() {
    const port = Number(process.env.PORT) || 3000;
    await this.server.listen({ port });  
  }

  public getServerInstance(): FastifyInstance {
    return this.server;
  }
}
