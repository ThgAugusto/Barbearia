import { inject, AutoRegister } from '../../utils/auto-register.decorator';
import { FastifyInstance, FastifyReply } from 'fastify';
import argon2 from 'argon2';
import { authSchema } from '../validations/auth.validations';
import { AuthEmailNotFoundError, IncorrectPasswordError } from '../../exceptions/auth.exception';
import { AuthDTO } from '../dtos/auth.dto';
import { AuthRepository } from '../repositories/auth.repository';
import { User } from '@prisma/client';
import { ValidationError } from '../../exceptions/custom.exception';

@AutoRegister()
export class AuthService {
    constructor(
        @inject(AuthRepository) private readonly authRepository: AuthRepository,
        @inject('FastifyInstance') private readonly fastify: FastifyInstance
    ) { }

    async authenticate(auth: AuthDTO, reply: FastifyReply): Promise<string> {
   
        const result = authSchema.safeParse(auth);
        
        if (!result.success) {
            throw new ValidationError(result.error);
        }

        const user = await this.findAuthUserByEmail(auth.email);

        const isPasswordValid = await argon2.verify(user.password, auth.password);


        if (!isPasswordValid) {
            throw new IncorrectPasswordError();
        }

        const token = this.fastify.jwt.sign(
            { userId: user.id, name: user.name, email: user.email, role: user.role },
            { expiresIn: '7d' }
        );

        reply.setCookie('token', token, {
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return token;
    }

    async findAuthUserByEmail(email: string): Promise<User> {
        const user = await this.authRepository.findByEmail(email);
        if (!user) {
            throw new AuthEmailNotFoundError();
        }
        return user;
    }
}
