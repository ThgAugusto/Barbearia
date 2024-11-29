import { FastifyReply, FastifyRequest } from 'fastify';
import { AuthSessionExpiredError, AuthInvalidCredentialsError, AuthUnauthorizedError, AuthAlreadyLoggedInError } from '../../exceptions/auth.exception';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    request.auth = await request.jwtVerify();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'jwt expired') {
        throw new AuthSessionExpiredError();
      } else if (error.message === 'invalid token') {
        throw new AuthInvalidCredentialsError();
      }
    }
    throw new AuthUnauthorizedError();
  }
}

export function checkUserRole(requiredRole: string) {
  return (request: FastifyRequest, reply: FastifyReply, done: Function) => {
    const userRole = request.auth.role;
    if (userRole !== requiredRole) {
      throw new AuthUnauthorizedError();
    }
    done();
  };
}

export async function preventAlreadyAuthenticated(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify();
    throw new AuthAlreadyLoggedInError();
  } catch (error) {
    if (error instanceof AuthAlreadyLoggedInError) {
      throw error;
    }
    return;

  }
}
