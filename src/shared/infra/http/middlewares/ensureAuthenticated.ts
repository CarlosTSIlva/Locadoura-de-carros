import { AppError } from '@shared/errors/AppErrors';
import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

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
    throw new AppError('Token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: userId } = verify(
      token,
      '01ca22da6d6081d987c5c7f7e02d552a1ae50022'
    ) as IPayload;

    const usersRepostiroty = new UserRepository();

    const userExist = await usersRepostiroty.findById(userId);
    if (!userExist) {
      throw new AppError('User not found', 401);
    }

    req.user = {
      id: userId,
    };
    return next();
  } catch {
    throw new AppError('Token is invalid', 401);
  }
}
