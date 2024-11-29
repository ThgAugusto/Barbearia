import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../dtos/user.dto';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';

@AutoRegister()
export class UserController {

    constructor(@inject(UserService) private readonly userService: UserService) { }

    async createOwner(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply): Promise<void> {
        const createdUser = await this.userService.createOwner(request.body);
        reply.status(201).send(createdUser);
    }

    async createBarber(request: FastifyRequest<{ Body: CreateUserDTO }>, reply: FastifyReply): Promise<void> {
        const createdUser = await this.userService.createBarber(request.body, request.auth.userId);
        reply.status(201).send(createdUser);
    }

    async findAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const users = await this.userService.findAll();
        reply.status(200).send(users);
    }

    async findAllBarbersByBarbershopId(request: FastifyRequest<{ Params: { barbershopId: number } }>, reply: FastifyReply): Promise<void> {
        const users = await this.userService.findAllBarbersByBarbershopId(Number(request.params.barbershopId), request.auth.userId);
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
       const inactiveUser = await this.userService.softDelete(Number(request.params.id));
        reply.status(200).send(inactiveUser);
    }

    async restore(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const activeUser = await this.userService.restore(Number(request.params.id));
         reply.status(200).send(activeUser);
     }
}
