import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { ICreateUserDTO } from '@modules/dtos/ICreateUserDTO';
import { IUserRepository } from '../IUserRepository';

class UsersRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, { driver_license, email, name, password });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByName(name: string): Promise<User> {
    const user = this.users.find((user) => user.name === name);
    return user;
  }

  async list(): Promise<User[]> {
    const users = this.users;
    return users;
  }
}

export { UsersRepositoryInMemory };
