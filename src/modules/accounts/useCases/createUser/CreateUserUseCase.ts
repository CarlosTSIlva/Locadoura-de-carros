import { AppError } from '@shared/errors/AppErrors';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { ICreateUserDTO } from '@modules/dtos/ICreateUserDTO';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const hashedPassword = await hash(password, 8);
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    await this.userRepository.create({
      name,
      email,
      driver_license,
      password: hashedPassword,
    });
  }
}

export { CreateUserUseCase };
