import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';

@AutoRegister()
export class UserController {

    constructor(@inject(UserService) private readonly userService: UserService) { }

    async create(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply): Promise<void> {
        const createdUser = await this.userService.create(request.body);
        reply.status(201).send(createdUser);
    }

    async findAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const users = await this.userService.findAll();
        reply.status(200).send(users);
    }

    async findById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const user = await this.userService.findById(Number(request.params.id));
        reply.status(200).send(user);
    }

    async update(request: FastifyRequest<{ Params: { id: number }; Body: UpdateUserDTO }>, reply: FastifyReply): Promise<void> {
        const updatedUser = await this.userService.update(Number(request.params.id), request.body);
        reply.status(200).send(updatedUser);
    }

    async softDelete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        await this.userService.softDelete(Number(request.params.id));
        reply.status(200).send({ message: 'Usuário deletado com sucesso' });
    }
}
