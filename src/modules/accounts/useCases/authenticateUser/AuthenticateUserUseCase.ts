import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppErrors";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUserRepository
    ) {}

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, "01ca22da6d6081d987c5c7f7e02d552a1ae50022", {
            subject: user.id,
            expiresIn: "1d",
        });

        const loginUser: IResponse = {
            user: {
                email: user.email,
                name: user.name,
            },
            token,
        };

        return loginUser;
    }
}

export { AuthenticateUserUseCase };
