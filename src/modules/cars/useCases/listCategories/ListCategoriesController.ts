import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
    constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) { }

    async handle(req: Request, res: Response): Promise<Response> {
        const categories = await this.listCategoriesUseCase.execute();
        return res.status(200).send(categories);
    }
}

export { ListCategoriesController };
