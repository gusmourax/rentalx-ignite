import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

export interface IRequest {
    name: string;
    description: string;
}

class CreateCategoryUseCase {
    constructor(private readonly categoriesRespository: ICategoriesRepository) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRespository.findByName(name);
        if (categoryAlreadyExists) throw new Error('Category already exists!');

        await this.categoriesRespository.create({ description, name });
    }
}

export { CreateCategoryUseCase };
