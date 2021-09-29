import { Request, Response } from 'express';

import { ListCategoriesUseCase } from './ListCategoriesUseCase';

class ListCategoriesController {
    constructor(private readonly listCategoriesUseCase: ListCategoriesUseCase) { }

    handle(req: Request, res: Response): Response {
        const categories = this.listCategoriesUseCase.execute();
        return res.status(200).send(categories);
    }
}

export { ListCategoriesController };
