import { FastifyReply, FastifyRequest } from 'fastify';
import { SchedulingService } from '../services/scheduling.service';
import { CreateSchedulingDTO, UpdateSchedulingDTO } from '../dtos/scheduling.dto';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';

@AutoRegister()
export class SchedulingController {

    constructor(@inject(SchedulingService) private readonly schedulingService: SchedulingService) { }

    async create(request: FastifyRequest<{ Body: CreateSchedulingDTO }>, reply: FastifyReply): Promise<void> {
        const createdScheduling = await this.schedulingService.create(request.body);
        reply.status(201).send(createdScheduling);
    }

    async findAllByOwner(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const ownerId = request.auth.userId;
        const barbershops = await this.schedulingService.findAllByOwner(ownerId);
        reply.status(200).send(barbershops);
    }
    
    async findAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const schedulings = await this.schedulingService.findAll();
        reply.status(200).send(schedulings);
    }

    async findById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const scheduling = await this.schedulingService.findById(Number(request.params.id));
        reply.status(200).send(scheduling);
    }

    async update(request: FastifyRequest<{ Params: { id: number }; Body: UpdateSchedulingDTO }>, reply: FastifyReply): Promise<void> {
        const updatedScheduling = await this.schedulingService.update(Number(request.params.id), request.body);
        reply.status(200).send(updatedScheduling);
    }

    async softDelete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const scheduling = await this.schedulingService.softDelete(Number(request.params.id));
        reply.status(200).send(scheduling);
    }

    async markAsCompleted(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const scheduling = await this.schedulingService.markAsCompleted(Number(request.params.id));
        reply.status(200).send(scheduling);
    }
    
    async calculateAvailableTimes(request: FastifyRequest<{ Querystring: { barberId: number; date: string; treatmentId: number } }>, reply: FastifyReply): Promise<void> {
        const availableTimes = await this.schedulingService.calculateAvailableTimes(Number(request.query.barberId), new Date(request.query.date), Number(request.query.treatmentId));
        reply.status(200).send(availableTimes);
    }
}
