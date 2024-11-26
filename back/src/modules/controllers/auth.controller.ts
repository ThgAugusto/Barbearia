import { FastifyReply, FastifyRequest } from 'fastify';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dtos/auth.dto';

@AutoRegister()
export class AuthController {

    constructor(@inject(AuthService) private readonly authService: AuthService) { }

    async authenticate(request: FastifyRequest<{ Body: AuthDTO }>, reply: FastifyReply): Promise<void> {
        const token = await this.authService.authenticate(request.body, reply);
        reply.status(200).send({ token });
    }

}