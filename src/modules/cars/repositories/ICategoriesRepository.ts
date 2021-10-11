import { Category } from '../entities/Category';

export interface ICreateCategoryDTO {
    name: string;
    description: string;
}

interface ICategoriesRepository {
    findByName(name: string): Promise<Category>;
    list(): Promise<Category[]>;
    create(createCategoryDto: ICreateCategoryDTO): Promise<void>;
}

export { ICategoriesRepository };
