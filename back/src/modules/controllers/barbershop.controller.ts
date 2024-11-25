import { FastifyReply, FastifyRequest } from 'fastify';
import { BarbershopService } from '../services/barbershop.service';
import { CreateBarbershopDTO, UpdateBarbershopDTO } from '../dtos/barbershop.dto';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';

@AutoRegister()
export class BarbershopController {

    constructor(@inject(BarbershopService) private readonly barbershopService: BarbershopService) { }

    async create(request: FastifyRequest<{ Body: CreateBarbershopDTO }>, reply: FastifyReply): Promise<void> {
        const createdBarbershop = await this.barbershopService.create(request.body, request.auth.userId);
        reply.status(201).send(createdBarbershop);
    }

    async findAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const barbershops = await this.barbershopService.findAll();
        reply.status(200).send(barbershops);
    }

    async findById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const barbershop = await this.barbershopService.findById(Number(request.params.id));
        reply.status(200).send(barbershop);
    }

    async update(request: FastifyRequest<{ Params: { id: number }; Body: UpdateBarbershopDTO }>, reply: FastifyReply): Promise<void> {
        const updatedBarbershop = await this.barbershopService.update(Number(request.params.id), request.body, request.auth.userId);
        reply.status(200).send(updatedBarbershop);
    }

    async softDelete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        await this.barbershopService.softDelete(Number(request.params.id));
        reply.status(200).send({ message: 'Barbearia deletata com sucessso' });
    }
}
