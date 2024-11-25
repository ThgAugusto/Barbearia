import argon2 from 'argon2';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { UserRepository } from '../repositories/user.repository';
import { UserDTO, CreateUserDTO, UpdateUserDTO, UserResponseDTO } from '../dtos/user.dto';
import { UserAlreadyExistsError, UserNotFoundError, UserValidationError } from '../../exceptions/user.exceptions';
import { createUserSchema, updateUserSchema } from '../validations/user.validations';
import { BarbershopService } from './barbershop.service';

@AutoRegister()
export class UserService {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(BarbershopService) private readonly barbershopService: BarbershopService
  ) { }

  async create(userData: CreateUserDTO): Promise<UserResponseDTO> {
    const result = createUserSchema.safeParse(userData);
    if (!result.success) {
      throw new UserValidationError(result.error);
    }

    if (userData.barbershopId) {
      await this.barbershopService.findById(userData.barbershopId);
    }

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }

    const hashedPassword = await argon2.hash(userData.password);

    const createdUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    return new UserDTO(createdUser).toResponse();
  }

  async findById(id: number): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError();
    }

    return new UserDTO(user).toResponse(); 
  }

  async findAuthUserByEmail(email: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError();
    }
    return new UserDTO(user); 
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();
   
    return users.map(user => new UserDTO(user).toResponse());
  }

  async update(id: number, userData: UpdateUserDTO): Promise<UserResponseDTO> {
    const result = updateUserSchema.safeParse(userData);
    if (!result.success) {
      throw new UserValidationError(result.error);
    }

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new UserNotFoundError();
    }

    if (userData.password) {
      userData.password = await argon2.hash(userData.password);
    }

    const updatedUser = await this.userRepository.update(id, userData);

    return new UserDTO(updatedUser).toResponse(); 
  }

  async softDelete(id: number): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser || existingUser.status === "INACTIVE") {
      throw new UserNotFoundError();
    }
    await this.userRepository.softDelete(id);
  }
}
