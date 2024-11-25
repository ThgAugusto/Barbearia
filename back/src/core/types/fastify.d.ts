import { FastifyRequest } from "fastify";

declare module 'fastify' {
    interface FastifyRequest {
      auth: {
        userId: number;
        name: string;
        email: string;
        role: string;
        iat: number;  
        exp: number;  
      };
    }
  }
  