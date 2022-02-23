import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { UsersRepository } from '../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../shared/errors/AppError';

interface IPayload {
    sub: string
}

export async function ensureAuthenticated(
    req: Request, res: Response, next: NextFunction,
): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new AppError('Token is missing', 500);

    const [, token] = authHeader.split(' ');

    try {
        const { sub: user_id } = jwt.verify(token, 'a7e071b3de48cec1dd24de6cbe6c7bf1') as IPayload;
        const usersRepository = new UsersRepository();
        const user = await usersRepository.findById(user_id);

        if (!user) throw new AppError('User not exists', 401);

        req.user = {
            id: user_id,
        };

        return next();
    } catch {
        throw new AppError('Token invalid', 400);
    }
}
