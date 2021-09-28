import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

export interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private readonly categoriesRespository: ICategoriesRepository) { }

    execute({ name, description }: IRequest): void {
        const categoryAlreadyExists = this.categoriesRespository.findByName(name);
        if (categoryAlreadyExists) throw new Error('Category already exists!');

        this.categoriesRespository.create({ description, name });
    }
}

export { CreateCategoryUseCase };
