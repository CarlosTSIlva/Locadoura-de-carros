import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../errors/AppErrors";
import { UserRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token is missing", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
        const { sub: userId } = verify(
            token,
            "01ca22da6d6081d987c5c7f7e02d552a1ae50022"
        ) as IPayload;
        console.log(userId);

        const usersRepostiroty = new UserRepository();

        const userExist = usersRepostiroty.findById(userId);

        if (!userExist) {
            throw new AppError("User not found", 401);
        }

        return next();
    } catch {
        throw new AppError("Token is invalid", 401);
    }
}
