import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { ClientRepository } from '../repositories/client.repository';
import { CreateClientDTO, UpdateClientDTO, ClientResponseDTO, ClientDTO } from '../dtos/client.dto';
import { ClientNotFoundError, ClientValidationError, ClientEmailAlreadyExistsError } from '../../exceptions/client.exception';
import { createClientSchema, updateClientSchema } from '../validations/client.validations';

@AutoRegister()
export class ClientService {
  constructor(
    @inject(ClientRepository) private readonly clientRepository: ClientRepository
  ) { }

  async create(clientData: CreateClientDTO): Promise<ClientResponseDTO> {
    const result = createClientSchema.safeParse(clientData);
    if (!result.success) {
      throw new ClientValidationError(result.error);
    }

    const existingClient = await this.clientRepository.findByEmail(clientData.email);
    if (existingClient) {
      throw new ClientEmailAlreadyExistsError();
    }

    const createdClient = await this.clientRepository.create(clientData);
    return new ClientDTO(createdClient).toResponse();
  }

  async findById(id: number): Promise<ClientResponseDTO> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new ClientNotFoundError();
    }

    return new ClientDTO(client).toResponse();
  }

  async findAll(): Promise<ClientResponseDTO[]> {
    const clients = await this.clientRepository.findAll();
    return clients.map(client => new ClientDTO(client).toResponse());
  }

  async update(id: number, clientData: UpdateClientDTO): Promise<ClientResponseDTO> {
    const result = updateClientSchema.safeParse(clientData);
    if (!result.success) {
      throw new ClientValidationError(result.error);
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
    return new ClientDTO(updatedClient).toResponse();
  }

  async softDelete(id: number): Promise<void> {
    const existingClient = await this.clientRepository.findById(id);
    if (!existingClient || existingClient.status === 'INACTIVE') {
      throw new ClientNotFoundError();
    }

    await this.clientRepository.softDelete(id);
  }
}
