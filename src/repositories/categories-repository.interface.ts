import { Category } from '../models/category.model';

export interface ICreateCategoryDTO {
    name: string,
    description: string
}

interface ICategoriesRepository {
    findByName(name: string): Category;
    list(): Category[];
    create(createCategoryDto: ICreateCategoryDTO): void;
}

export { ICategoriesRepository };
