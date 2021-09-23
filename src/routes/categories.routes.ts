import { Router } from 'express';

import { CategoriesRepository } from '../repositories/categories.repository';

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post('/', (req, res) => {
    const { name, description } = req.body;

    const categoryAlreadyExists = categoriesRepository.findByName(name);
    if (categoryAlreadyExists) return res.status(400).send({ error: 'Category already exists!' });

    categoriesRepository.create({ description, name });
    return res.status(201).send();
});

categoriesRoutes.get('/', (req, res) => {
    const categories = categoriesRepository.list();
    return res.status(200).send(categories);
});

export { categoriesRoutes };
