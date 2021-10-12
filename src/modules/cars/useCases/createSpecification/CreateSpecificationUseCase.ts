import { inject, injectable } from 'tsyringe';

import { ICreateSpecificationDTO, ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationsRepository')
        private readonly specificationsRepository: ISpecificationsRepository,
    ) { }

    async execute({ description, name }: ICreateSpecificationDTO): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) throw new Error('Specification already exists!');
        return this.specificationsRepository.create({ description, name });
    }
}

export { CreateSpecificationUseCase };
