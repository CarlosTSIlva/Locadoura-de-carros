import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { IcarsRepository } from '@modules/cars/repositories/IcarsRepository';
import { AppError } from '@shared/errors/AppErrors';
import { inject, injectable } from 'tsyringe';

interface IRequest extends ICreateCarsDTO {}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: IcarsRepository
  ) {}
  async execute({
    brand,
    category_id,
    dayli_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: IRequest): Promise<Car> {
    const carAlreadyExist = await this.carsRepository.findByLicensePlate(
      license_plate
    );

    if (carAlreadyExist) {
      throw new AppError('Car already exist');
    }

    const car = await this.carsRepository.create({
      brand,
      category_id,
      dayli_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });
    return car;
  }
}

export { CreateCarUseCase };
