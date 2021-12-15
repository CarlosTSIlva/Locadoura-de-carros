import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {}

    execute({ description, name }: IRequest): void {
        const specificationRepository =
            this.specificationRepository.findByName(name);
        if (specificationRepository) {
            throw new Error("Specification already exists");
        }

        this.specificationRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
