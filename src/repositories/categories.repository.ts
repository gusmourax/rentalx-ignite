import { Category } from '../models/category.model';
import { ICategoriesRepository, ICreateCategoryDTO } from './categories-repository.interface';

class CategoriesRepository implements ICategoriesRepository {
    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    create({ description, name }: ICreateCategoryDTO): void {
        const category = new Category(name, description);
        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find((category) => category.name === name);
        return category;
    }
}

export { CategoriesRepository };
