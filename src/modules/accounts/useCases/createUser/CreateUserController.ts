import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {
            username, name, password, driver_license, email,
        } = req.body;

        const createUserUseCase = container.resolve(CreateUserUseCase);
        await createUserUseCase.execute({
            username, name, password, driver_license, email,
        });
        return res.status(201).send();
    }
}

export { CreateUserController };
