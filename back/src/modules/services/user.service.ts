import argon2 from 'argon2';
import { AutoRegister, inject } from '../../utils/auto-register.decorator';
import { UserRepository } from '../repositories/user.repository';
import { CreateUserDTO, UpdateUserDTO, UserResponseDTO } from '../dtos/user.dto';
import { UserAlreadyExistsError, UserNotFoundError, UserValidationError } from '../../exceptions/user.exceptions';
import { createUserSchema, updateUserSchema } from '../validations/user.validations';

@AutoRegister()
export class UserService {
  constructor(@inject(UserRepository) private readonly userRepository: UserRepository) { }

  async create(userData: CreateUserDTO): Promise<UserResponseDTO> {
    const result = createUserSchema.safeParse(userData);

    if (!result.success) {
      throw new UserValidationError(result.error);
    }

    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new UserAlreadyExistsError('O e-mail informado já está associado a uma conta.');
    }

    const hashedPassword = await argon2.hash(userData.password);

    const createdUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword
    });

    return new UserResponseDTO(createdUser);
  }

  async findById(id: number): Promise<UserResponseDTO> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new UserNotFoundError('Não foi possível encontrar o usuário com o indentificador fornecido.');
    }

    return new UserResponseDTO(user);
  }

  async findAuthUserByEmail(email: string): Promise<UserResponseDTO> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UserNotFoundError('Não foi possível encontrar o usuário com o e-mail fornecido.');
    }

    return user;
  }

  async findAll(): Promise<UserResponseDTO[]> {
    const users = await this.userRepository.findAll();
    return users.map(user => new UserResponseDTO(user));
  }

  async update(id: number, userData: UpdateUserDTO): Promise<UserResponseDTO> {
    const result = updateUserSchema.safeParse(userData);

    if (!result.success) {
      throw new UserValidationError(result.error);
    }

    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new UserNotFoundError('Usuário não encontrado.');
    }

    if (userData.password) {
      userData.password = await argon2.hash(userData.password);
    }

    const updatedUser = await this.userRepository.update(id, userData);

    return new UserResponseDTO(updatedUser);
  }

  async delete(id: number): Promise<void> {
    const existingUser = await this.userRepository.findById(id);


    if (!existingUser || existingUser.status === "INACTIVE") {
      throw new UserNotFoundError('Usuário não encontrado.');
    }

    await this.userRepository.delete(id);
  }
}
