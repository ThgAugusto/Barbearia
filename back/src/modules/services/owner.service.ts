import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { OwnerRepository } from '../repositories/owner.repository';
import { CreateOwnerDTO, UpdateOwnerDTO, OwnerResponseDTO, OwnerDTO } from '../dtos/owner.dto';
import { UserNotFoundError, NoOwnerFoundError, UserAlreadyExistsErrorEmail, UserAlreadyExistsErrorCpf } from '../../exceptions/user.exceptions';
import { ValidationError } from '../../exceptions/custom.exception';
import { AuthUnauthorizedError } from '../../exceptions/auth.exception';
import { createOwnerSchema, updateOwnerSchema } from '../validations/owner.validations';
import argon2 from 'argon2';

@AutoRegister()
export class OwnerService {
  constructor(
    @inject(OwnerRepository) private readonly ownerRepository: OwnerRepository
  ) { }

  async create(ownerData: CreateOwnerDTO): Promise<OwnerResponseDTO> {
    const result = createOwnerSchema.safeParse(ownerData);
    if (!result.success) {
      throw new ValidationError(result.error);
    }

    const existingUserEmail = await this.ownerRepository.findByEmail(ownerData.user.email);
    if (existingUserEmail) {
      throw new UserAlreadyExistsErrorEmail();
    }

    const existingUserCpf = await this.ownerRepository.findByCpf(ownerData.user.cpf);
    if (existingUserCpf) {
      throw new UserAlreadyExistsErrorCpf();
    }


    ownerData = result.data;
    ownerData.user.password = await argon2.hash(ownerData.user.password);

    const createdOwner = await this.ownerRepository.create(ownerData);
    return new OwnerDTO(createdOwner, createdOwner.user).toResponse();
  }

  async findById(id: number): Promise<OwnerResponseDTO> {
    const owner = await this.ownerRepository.findById(id);
    if (!owner) {
      throw new UserNotFoundError();
    }
    return new OwnerDTO(owner, owner.user).toResponse();
  }

  async findAll(): Promise<OwnerResponseDTO[]> {
    const owners = await this.ownerRepository.findAll();

    if (!owners || owners.length === 0) {
      throw new NoOwnerFoundError();
    }
    return owners.map(owner => new OwnerDTO(owner, owner.user).toResponse());
  }

  async update(id: number, ownerData: UpdateOwnerDTO): Promise<OwnerResponseDTO> {
    const result = updateOwnerSchema.safeParse(ownerData);
    if (!result.success) {
      throw new ValidationError(result.error);
    }

    const existingOwner = await this.ownerRepository.findById(id);
    if (!existingOwner) {
      throw new UserNotFoundError();
    }

    if (ownerData.user?.email) {
      const existingUserWithEmail = await this.ownerRepository.findByUserId(id);
      if (existingUserWithEmail && existingUserWithEmail.user.email !== ownerData.user.email) {
        throw new UserAlreadyExistsErrorEmail();
      }
    }

    if (ownerData.user.email) {
      const existingUserEmail = await this.ownerRepository.findByEmail(ownerData.user.email);
      if (existingUserEmail) {
        throw new UserAlreadyExistsErrorEmail();
      }

    }

    if (ownerData.user.cpf) {
      const existingUserCpf = await this.ownerRepository.findByCpf(ownerData.user.cpf);
      if (existingUserCpf) {
        throw new UserAlreadyExistsErrorCpf();
      }
    }


    const updatedOwner = await this.ownerRepository.update(id, ownerData);
    return new OwnerDTO(updatedOwner, updatedOwner.user).toResponse();
  }

  async softDelete(id: number): Promise<OwnerResponseDTO> {
    const existingOwner = await this.ownerRepository.findById(id);
    if (!existingOwner || existingOwner.user.status === 'INACTIVE') {
      throw new UserNotFoundError();
    }

    const inactiveOwner = await this.ownerRepository.softDelete(id);
    return new OwnerDTO(inactiveOwner, inactiveOwner.user).toResponse();
  }

  async restore(id: number): Promise<OwnerResponseDTO> {
    const existingOwner = await this.ownerRepository.findById(id);
    if (!existingOwner || existingOwner.user.status === 'ACTIVE') {
      throw new UserNotFoundError();
    }

    const restoredOwner = await this.ownerRepository.restore(id);
    return new OwnerDTO(restoredOwner, restoredOwner.user).toResponse();

  }
}
