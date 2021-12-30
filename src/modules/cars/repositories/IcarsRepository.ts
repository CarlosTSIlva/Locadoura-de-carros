import { ICreateCarsDTO } from '../dtos/ICreateCarsDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface IcarsRepository {
  create(data: ICreateCarsDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}

export { IcarsRepository };
