import argon2 from 'argon2';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { UserRepository } from '../repositories/user.repository';
import { UserDTO, CreateUserDTO, UpdateUserDTO, UserResponseDTO } from '../dtos/user.dto';
import { BarberWithoutBarbershopIdError, UserAlreadyExistsError, UserNotFoundError } from '../../exceptions/user.exceptions';
import { createUserSchema, updateUserSchema } from '../validations/user.validations';
import { BarbershopService } from './barbershop.service';
import { ValidationError } from '../../exceptions/custom.exception';
import { AuthUnauthorizedError } from '../../exceptions/auth.exception';

@AutoRegister()
export class UserService {
  constructor(
    @inject(UserRepository) private readonly userRepository: UserRepository,
    @inject(BarbershopService) private readonly barbershopService: BarbershopService
  ) { }

  private async ComumCreate(userData: CreateUserDTO): Promise<string> {
    const result = createUserSchema.safeParse(userData);
    if (!result.success) {
      throw new ValidationError(result.error);
    }
  
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new UserAlreadyExistsError();
    }
  
    const hashedPassword = await argon2.hash(userData.password);
    return hashedPassword; 
  }
  
  async createBarber(userData: CreateUserDTO, userId: number): Promise<UserResponseDTO> {
    userData.role = 'BARBER';
    if (!userData.barbershopId) {
      throw new BarberWithoutBarbershopIdError();
    }
  
    const response = await this.barbershopService.findById(userData.barbershopId);
    if (response.ownerId !== userId) {
      throw new AuthUnauthorizedError();
    }
  
    const hashedPassword = await this.ComumCreate(userData);
  
    const createdUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });
  
    return new UserDTO(createdUser).toResponse();
  }
  
  async createOwner(userData: CreateUserDTO): Promise<UserResponseDTO> {
    userData.role = 'OWNER';
    const hashedPassword = await this.ComumCreate(userData);
  
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

  async findAll(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();

    return users.map(user => new UserDTO(user).toResponse());
  }

  async findAllBarbersByBarbershopId(barbershopId: number, userId?: number): Promise<UserResponseDTO[]> {
    const response = await this.barbershopService.findById(barbershopId);

    if (response.ownerId !== userId) {
      throw new AuthUnauthorizedError();
    }


    const barbers = await this.userRepository.findAllBarbersByBarbershopId(barbershopId);
    return barbers.map(user => new UserDTO(user).toResponse());
  }


  async update(id: number, userData: UpdateUserDTO): Promise<UserResponseDTO> {
    const result = updateUserSchema.safeParse(userData);
    if (!result.success) {
      throw new ValidationError(result.error);
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

  async softDelete(id: number): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser || existingUser.status === "INACTIVE") {
      throw new UserNotFoundError();
    }
    const inactiveUser = await this.userRepository.softDelete(id);
    return new UserDTO(inactiveUser).toResponse();
  }

  async restore(id: number): Promise<UserResponseDTO> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser || existingUser.status === "ACTIVE") {
      throw new UserNotFoundError();
    }
    
    const restoredUser = await this.userRepository.restore(id);
    
    return new UserDTO(restoredUser).toResponse();
  }
}
