import { Category } from '../models/category.model';
import { ICategoriesRepository, ICreateCategoryDTO } from './categories-repository.interface';

class PostgresCategoriesRepository implements ICategoriesRepository {
    findByName(name: string): Category {
        console.log(name);
        return null;
    }
    list(): Category[] {
        console.log('Listagem de categories');
        return null;
    }
    create({ name, description }: ICreateCategoryDTO): void {
        console.log(name, description);
    }
}

export { PostgresCategoriesRepository };
