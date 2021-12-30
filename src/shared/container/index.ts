import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@modules/accounts/repositories/IUserRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { ISpecificationRepository } from '@modules/cars/repositories/ISpecificationRepository';
import { container } from 'tsyringe';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { IcarsRepository } from '@modules/cars/repositories/IcarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository);

container.registerSingleton<IcarsRepository>('CarsRepository', CarsRepository);
