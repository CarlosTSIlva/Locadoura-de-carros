import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppErrors";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoryRepository: ICategoriesRepository
    ) {}

    async execute({ description, name }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoryRepository.findByName(
            name
        );
        if (categoryAlreadyExists) {
            throw new AppError("Category already exists");
        }

        const create = await this.categoryRepository.create({
            name,
            description,
        });
        console.log(create);
    }
}
export { CreateCategoryUseCase };
