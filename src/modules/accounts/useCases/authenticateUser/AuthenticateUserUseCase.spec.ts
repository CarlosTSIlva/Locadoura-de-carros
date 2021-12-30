import { AppError } from '@shared/errors/AppErrors';
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { ICreateUserDTO } from '@modules/dtos/ICreateUserDTO';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
  });

  it('should be to autenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '123456789',
      email: 'carlos1@hotmail.com',
      name: 'Carlos',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const userAuthenticated = await authenticateUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(userAuthenticated).toHaveProperty('token');
  });

  it('should not be able to authenticate an exist user', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '123456789',
        email: 'carlos4@hotmail.com',
        name: 'Carlos',
        password: '123456',
      };

      await authenticateUseCase.execute({
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an incorrect password', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '123456789',
        email: 'carlos2@hotmail.com',
        name: 'Carlos',
        password: '123456',
      };
      await createUserUseCase.execute(user);

      await authenticateUseCase.execute({
        email: user.email,
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an incorrect email', async () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '123456789',
        email: 'carlos3@hotmail.com',
        name: 'Carlos',
        password: '123456',
      };

      await createUserUseCase.execute(user);

      await authenticateUseCase.execute({
        email: 'user.email',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
