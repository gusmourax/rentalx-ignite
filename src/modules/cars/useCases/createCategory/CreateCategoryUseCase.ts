import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

export interface IRequest {
    name: string;
    description: string;
}

@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private readonly categoriesRespository: ICategoriesRepository,
    ) { }

    async execute({ name, description }: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRespository.findByName(
            name,
        );
        if (categoryAlreadyExists) throw new AppError('Category already exists!', 400);

        await this.categoriesRespository.create({ description, name });
    }
}

export { CreateCategoryUseCase };
