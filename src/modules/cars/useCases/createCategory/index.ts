import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategotyController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

const categoriesRepository = new CategoriesRepository();
const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
const createCategotyController = new CreateCategotyController(createCategoryUseCase);

export { createCategotyController };
