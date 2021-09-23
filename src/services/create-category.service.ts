import { ICategoriesRepository } from '../repositories/categories-repository.interface';

export interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryService {
    constructor(private readonly categoriesRespository: ICategoriesRepository) { }

    execute({ name, description }: IRequest): void {
        const categoryAlreadyExists = this.categoriesRespository.findByName(name);
        if (categoryAlreadyExists) throw new Error('Category already exists!');

        this.categoriesRespository.create({ description, name });
    }
}

export { CreateCategoryService };
