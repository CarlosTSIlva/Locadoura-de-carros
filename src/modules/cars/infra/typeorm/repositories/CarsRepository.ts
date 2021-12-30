import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarsDTO';
import { IcarsRepository } from '@modules/cars/repositories/IcarsRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Car } from '../entities/Car';

@EntityRepository(Car)
class CarsRepository implements IcarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    dayli_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarsDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      dayli_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ where: { license_plate } });
    return car;
  }
}

export { CarsRepository };
