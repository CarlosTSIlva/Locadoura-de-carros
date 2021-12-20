import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { password, email } = req.body;

        const authenticateUserUseCase = container.resolve(
            AuthenticateUserUseCase
        );

        const response = await authenticateUserUseCase.execute({
            email,
            password,
        });
        return res.status(200).json(response);
    }
}

export { AuthenticateUserController };
