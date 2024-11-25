import { FastifyReply, FastifyRequest } from 'fastify';
import { ClientService } from '../services/client.service';
import { CreateClientDTO, UpdateClientDTO } from '../dtos/client.dto';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';

@AutoRegister()
export class ClientController {

    constructor(@inject(ClientService) private readonly clientService: ClientService) { }

    async create(request: FastifyRequest<{ Body: CreateClientDTO }>, reply: FastifyReply): Promise<void> {
        const createdClient = await this.clientService.create(request.body);
        reply.status(201).send(createdClient);
    }

    async findAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        const clients = await this.clientService.findAll();
        reply.status(200).send(clients);
    }

    async findById(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        const client = await this.clientService.findById(Number(request.params.id));
        reply.status(200).send(client);
    }

    async update(request: FastifyRequest<{ Params: { id: number }; Body: UpdateClientDTO }>, reply: FastifyReply): Promise<void> {
        const updatedClient = await this.clientService.update(Number(request.params.id), request.body);
        reply.status(200).send(updatedClient);
    }

    async softDelete(request: FastifyRequest<{ Params: { id: number } }>, reply: FastifyReply): Promise<void> {
        await this.clientService.softDelete(Number(request.params.id));
        reply.status(200).send({ message: 'Cliente deletado com sucesso' });
    }
}
