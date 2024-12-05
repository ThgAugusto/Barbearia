import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { ClientRepository } from '../repositories/client.repository';
import { CreateClientDTO, UpdateClientDTO, ClientResponseDTO, ClientDTO } from '../dtos/client.dto';
import { ClientNotFoundError, ClientEmailAlreadyExistsError, NoClientsFoundError } from '../../exceptions/client.exception';
import { createClientSchema, updateClientSchema } from '../validations/client.validations';
import { ValidationError } from '../../exceptions/custom.exception';
import { BarbershopService } from './barbershop.service';
import { AuthUnauthorizedError } from '../../exceptions/auth.exception';
import { BarbershopInfo } from '../dtos/barbershop.dto';

@AutoRegister()
export class ClientService {
  constructor(
    @inject(ClientRepository) private readonly clientRepository: ClientRepository,
    @inject(BarbershopService) private readonly barbershopService: BarbershopService
  ) { }

  async create(clientData: CreateClientDTO, userId: number): Promise<ClientResponseDTO> {
    const result = createClientSchema.safeParse(clientData);
    if (!result.success) {
      throw new ValidationError(result.error);
    }

    const response = await this.barbershopService.findById(clientData.barbershopId);
    if (response.ownerId !== userId) {
      throw new AuthUnauthorizedError();
    }


    const existingClient = await this.clientRepository.findByEmail(clientData.email);
    if (existingClient) {
      throw new ClientEmailAlreadyExistsError();
    }

    const createdClient = await this.clientRepository.create(clientData);
    return new ClientDTO(createdClient).toResponse(createdClient.barbershop);
  }


  async findById(id: number): Promise<ClientResponseDTO> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new ClientNotFoundError();
    }
    return new ClientDTO(client).toResponse(client.barbershop);
  }

  async findAll(): Promise<ClientResponseDTO[]> {
    const clients = await this.clientRepository.findAll();
    return clients.map(client => new ClientDTO(client).toResponse());
  }

  async findAllByOwnerId(ownerId: number): Promise<ClientResponseDTO[]> {
    const clients = await this.clientRepository.findAllByOwnerId(ownerId);

    if (!clients || clients.length === 0) {
      throw new NoClientsFoundError()
    }

    return clients.map(client => new ClientDTO(client).toResponse(client.barbershop));

  }


  async findAllByBarbershopId(barbershopId: number): Promise<ClientResponseDTO[]> {
    const clients = await this.clientRepository.findAllByBarbershopId(barbershopId);

    if (!clients || clients.length === 0) {
      throw new NoClientsFoundError()
    }
    return clients.map(client => new ClientDTO(client).toResponse(client.barbershop));
  }

  async update(id: number, clientData: UpdateClientDTO): Promise<ClientResponseDTO> {
    const result = updateClientSchema.safeParse(clientData);
    if (!result.success) {
      throw new ValidationError(result.error);
    }

    const existingClient = await this.clientRepository.findById(id);
    if (!existingClient) {
      throw new ClientNotFoundError();
    }

    if (clientData.email) {
      const emailClient = await this.clientRepository.findByEmail(clientData.email);
      if (emailClient && emailClient.id !== id) {
        throw new ClientEmailAlreadyExistsError();
      }
    }

    const updatedClient = await this.clientRepository.update(id, clientData);
    return new ClientDTO(updatedClient).toResponse(updatedClient.barbershop);
  }

  async softDelete(id: number): Promise<ClientResponseDTO> {
    const existingClient = await this.clientRepository.findById(id);
    if (!existingClient || existingClient.status === 'INACTIVE') {
      throw new ClientNotFoundError();
    }

    const inativeClient = await this.clientRepository.softDelete(id);
    return new ClientDTO(inativeClient).toResponse(inativeClient.barbershop);
  }

  async restore(id: number): Promise<ClientResponseDTO> {
    const existingClient = await this.clientRepository.findById(id);
    if (!existingClient || existingClient.status === 'ACTIVE') {
      throw new ClientNotFoundError();
    }
    const activeClient = await this.clientRepository.restore(id);
    return new ClientDTO(activeClient).toResponse(activeClient.barbershop);
  }
}
