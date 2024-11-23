import { inject, AutoRegister } from '../../utils/auto-register.decorator';
import { UserService } from '../services/user.service';
import { FastifyInstance } from 'fastify';
import argon2 from 'argon2';
import { authSchema } from '../validations/auth.validations';
import { AuthValidationError, IncorrectPasswordError } from '../../exceptions/auth.exception';
import { AuthDTO } from '../dtos/auth.dto';

@AutoRegister()
export class AuthService {
    constructor(
        @inject(UserService) private readonly userService: UserService,
        @inject('FastifyInstance') private readonly fastify: FastifyInstance
    ) { }

    async authenticate(auth: AuthDTO): Promise<string> {

        const result = authSchema.safeParse(auth);

        if (!result.success) {
            throw new AuthValidationError(result.error);
        }

        const user = await this.userService.findAuthUserByEmail(auth.email);

        const isPasswordValid = await argon2.verify(user.password, auth.password);

        if (!isPasswordValid) {
            throw new IncorrectPasswordError('Senha incorreta. Por favor, verifique sua senha e tente novamente.')
        }

        const token = this.fastify.jwt.sign(
            { userId: user.id, name: user.name, email: user.email, role: user.role },
            { expiresIn: '1h' }
        );

        return token;
    }
}
