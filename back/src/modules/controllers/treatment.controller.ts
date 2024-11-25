import { FastifyReply, FastifyRequest } from 'fastify';
import { TreatmentService } from '../services/treatment.service';
import { CreateTreatmentDTO, UpdateTreatmentDTO } from '../dtos/treatment.dto';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';

@AutoRegister()
export class TreatmentController {

    constructor(@inject(TreatmentService) private readonly treatmentService: TreatmentService) { }

    async create(request: FastifyRequest<{ Body: CreateTreatmentDTO }>, reply: FastifyReply): Promise<void> {
        const createdTreatment = await this.treatmentService.create(request.body, request.auth.userId);
        reply.status(201).send(createdTreatment);
    }

    async findAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const treatments = await this.treatmentService.findAll();
        reply.status(200).send(treatments);
    }

    async findById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const treatment = await this.treatmentService.findById(Number(request.params.id));
        reply.status(200).send(treatment);
    }

    async update(request: FastifyRequest<{ Params: { id: number }; Body: UpdateTreatmentDTO }>, reply: FastifyReply): Promise<void> {
        const updatedTreatment = await this.treatmentService.update(Number(request.params.id), request.body, request.auth.userId);
        reply.status(200).send(updatedTreatment);
    }

    async softDelete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        await this.treatmentService.softDelete(Number(request.params.id));
        reply.status(200).send({ message: 'Tratamento deletado com sucesso' });
    }
}
