import { Router } from 'express';

import { CategoriesRepository } from '../modules/cars/repositories/implementations/CategoriesRepository';
import { createCategotyController } from '../modules/cars/useCases/createCategory';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => createCategotyController.handle(req, res));

categoriesRoutes.get('/', (req, res) => {
    const categories = categoriesRepository.list();
    return res.status(200).send(categories);
});

export { categoriesRoutes };
