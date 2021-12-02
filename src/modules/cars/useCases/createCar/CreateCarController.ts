import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarUseCase } from './CreateCarUseCase';

class CreateCarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const {
            brand,
            name,
            description,
            license_plate,
            fine_amount,
            category_id,
            daily_rate,
        } = req.body;

        const createCarUseCase = container.resolve(CreateCarUseCase);
        const car = await createCarUseCase.execute({
            brand,
            name,
            description,
            license_plate,
            fine_amount,
            category_id,
            daily_rate,
        });

        return res.status(201).json(car);
    }
}

export { CreateCarController };
