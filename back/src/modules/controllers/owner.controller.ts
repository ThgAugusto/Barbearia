import { FastifyReply, FastifyRequest } from 'fastify';
import { OwnerService } from '../services/owner.service';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { CreateOwnerDTO, UpdateOwnerDTO } from '../dtos/owner.dto.js';

@AutoRegister()
export class OwnerController {

    constructor(@inject(OwnerService) private readonly ownerService: OwnerService) { }

    async create(request: FastifyRequest<{ Body: CreateOwnerDTO }>, reply: FastifyReply): Promise<void> {
        const createdOwner = await this.ownerService.create(request.body);
        reply.status(201).send(createdOwner);
    }

    async findAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const owners = await this.ownerService.findAll();
        reply.status(200).send(owners);
    }

    async findById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const owner = await this.ownerService.findById(Number(request.params.id));
        reply.status(200).send(owner);
    }

    async update(request: FastifyRequest<{ Params: { id: number }; Body: UpdateOwnerDTO }>, reply: FastifyReply): Promise<void> {
        const updatedOwner = await this.ownerService.update(Number(request.params.id), request.body);
        reply.status(200).send(updatedOwner);
    }

    async softDelete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
       const inactiveOwner = await this.ownerService.softDelete(Number(request.params.id));
        reply.status(200).send(inactiveOwner);
    }

    async restore(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const activeOwner = await this.ownerService.restore(Number(request.params.id));
         reply.status(200).send(activeOwner);
     }
}
