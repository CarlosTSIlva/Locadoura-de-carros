import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IRequest {
    name: string;
    description: string;
}

const categoriesRepository = CategoriesRepository.getInstance();

class CreateCategoryUseCase {
    constructor(private categoryRepository: ICategoriesRepository) {}
    execute({ description, name }: IRequest): void {
        const categoryAlreadyExists = this.categoryRepository.findByName(name);
        if (categoryAlreadyExists) {
            throw new Error("Category already exists");
        }

        this.categoryRepository.create({
            name,
            description,
        });
    }
}
export { CreateCategoryUseCase };
