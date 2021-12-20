import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppErrors";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUserRepository
    ) {}

    async execute({
        name,
        email,
        driver_license,
        password,
    }: ICreateUserDTO): Promise<void> {
        const hashedPassword = await hash(password, 8);
        const userAlreadyExists = await this.userRepository.findByEmail(email);
        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }
        await this.userRepository.create({
            name,
            email,
            driver_license,
            password: hashedPassword,
        });
    }
}

export { CreateUserUseCase };
