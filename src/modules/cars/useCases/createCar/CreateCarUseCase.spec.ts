import { CarsRepositoryMemory } from '@modules/cars/repositories/in-momery/CarsRepositoryMemory';
import { AppError } from '@shared/errors/AppErrors';
import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryMemory;

describe('Create Car ', () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = {
      brand: 'Fiat',
      category_id: '5f3c8f8f-f8f8-4f0f-b8f8-f8f8f8f8f8f8',
      dayli_rate: 100,
      description: 'Carro de teste',
      fine_amount: 100,
      license_plate: 'ABC-1234',
      name: 'Carro de teste',
    };

    const carCreated = await createCarUseCase.execute(car);

    expect(carCreated).toHaveProperty('id');
  });

  it('shoul not be able to create a car with exits license plate', () => {
    expect(async () => {
      const car = {
        brand: 'Fiat',
        category_id: '5f3c8f8f-f8f8-4f0f-b8f8-f8f8f8f8f8f8',
        dayli_rate: 100,
        description: 'Carro de teste',
        fine_amount: 100,
        license_plate: 'ABC-1234',
        name: 'Carro de teste',
      };

      const car2 = {
        brand: 'Fiat2',
        category_id: '5f3c8f8f-f8f8-4f0f-b8f8-f8f8f8f8f8f8',
        dayli_rate: 100,
        description: 'Carro de teste',
        fine_amount: 100,
        license_plate: 'ABC-1234',
        name: 'Carro de teste',
      };
      await createCarUseCase.execute(car);
      await createCarUseCase.execute(car2);
    }).rejects.toBeInstanceOf(AppError);
  });

  it('shoul not be able to create a car with available true', async () => {
    const car = {
      brand: 'car available',
      category_id: '5f3c8f8f-f8f8-4f0f-b8f8-f8f8f8f8f8f8',
      dayli_rate: 100,
      description: 'Carro de teste',
      fine_amount: 100,
      license_plate: 'ABD-1234',
      name: 'Carro de teste',
    };

    const carCreate = await createCarUseCase.execute(car);
    expect(carCreate.available).toBe(true);
  });
});
