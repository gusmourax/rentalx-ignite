import { Router } from 'express';

import { PostgresCategoriesRepository } from '../repositories/postgres-categories.repository';
import { CreateCategoryService } from '../services/create-category.service';

const categoriesRoutes = Router();
const categoriesRepository = new PostgresCategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
    const { name, description } = req.body;

    const createCategoriesService = new CreateCategoryService(categoriesRepository);
    createCategoriesService.execute({ name, description });

    return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) => {
    const categories = categoriesRepository.list();
    return res.status(200).send(categories);
});

export { categoriesRoutes };
