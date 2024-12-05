import { FastifyReply, FastifyRequest } from 'fastify';
import { BarberService } from '../services/barber.service';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { CreateBarberDTO, UpdateBarberDTO } from '../dtos/barber.dto';

@AutoRegister()
export class BarberController {

    constructor(@inject(BarberService) private readonly barberService: BarberService) { }

    async create(request: FastifyRequest<{ Body: CreateBarberDTO }>, reply: FastifyReply): Promise<void> {
        const created = await this.barberService.create(request.body, request.auth.userId);
        reply.status(201).send(created);
    }

    async findAllByOwnerId(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const barbers = await this.barberService.findAllByOwnerId(request.auth.userId);
        reply.status(200).send(barbers);
    }

    async findAllByBarbershopId(request: FastifyRequest<{ Params: { barbershopId: number } }>, reply: FastifyReply): Promise<void> {
        const barbers = await this.barberService.findAllByBarbershopId(Number(request.params.barbershopId));
        reply.status(200).send(barbers);
    }

    async findById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const barber = await this.barberService.findById(Number(request.params.id));
        reply.status(200).send(barber);
    }

    async update(request: FastifyRequest<{ Params: { id: number }; Body: UpdateBarberDTO }>, reply: FastifyReply): Promise<void> {
        const updatedBarber = await this.barberService.update(Number(request.params.id), request.body);
        reply.status(200).send(updatedBarber);
    }

    async softDelete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
       const inactiveBarber = await this.barberService.softDelete(Number(request.params.id));
        reply.status(200).send(inactiveBarber);
    }

    async restore(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const activeBarber = await this.barberService.restore(Number(request.params.id));
         reply.status(200).send(activeBarber);
     }
}
