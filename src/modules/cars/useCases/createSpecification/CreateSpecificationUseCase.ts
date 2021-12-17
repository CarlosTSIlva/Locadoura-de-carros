import { ISpecificationRepository } from "../../repositories/ISpecificationRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationUseCase {
    constructor(private specificationRepository: ISpecificationRepository) {}

    async execute({ description, name }: IRequest): Promise<void> {
        const specificationRepository =
            await this.specificationRepository.findByName(name);
        if (specificationRepository) {
            throw new Error("Specification already exists");
        }

        await this.specificationRepository.create({
            name,
            description,
        });
    }
}

export { CreateSpecificationUseCase };
