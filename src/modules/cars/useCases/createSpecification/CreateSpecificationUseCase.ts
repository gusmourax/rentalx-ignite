import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateSpecificationDTO, ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private readonly specificationsRepository: ISpecificationsRepository,
    ) { }

    async execute({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) throw new AppError('Specification already exists!', 400);
        return this.specificationsRepository.create({ description, name });
    }
}

export { CreateSpecificationUseCase };
