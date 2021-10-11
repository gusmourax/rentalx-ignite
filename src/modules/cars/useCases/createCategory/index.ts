import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { CreateCategotyController } from './CreateCategoryController';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export default (): CreateCategotyController => {
    const categoriesRepository = new CategoriesRepository();
    const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository);
    const createCategotyController = new CreateCategotyController(createCategoryUseCase);
    return createCategotyController;
};
