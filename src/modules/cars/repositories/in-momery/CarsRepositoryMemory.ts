import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { IcarsRepository } from '../IcarsRepository';

class CarsRepositoryMemory implements IcarsRepository {
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === license_plate);
    return car;
  }

  cars: Car[] = [];

  async create({
    brand,
    category_id,
    dayli_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      dayli_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryMemory };
