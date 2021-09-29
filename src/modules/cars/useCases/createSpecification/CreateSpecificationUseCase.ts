import { ICreateSpecificationDTO, ISpecificationsRepository } from '../../repositories/ISpecificationsRepository';

class CreateSpecificationUseCase {
    constructor(private readonly specificationsRepository: ISpecificationsRepository) { }

    execute({ description, name }: ICreateSpecificationDTO): void {
        const specificationAlreadyExists = this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) throw new Error('Specification already exists!');
        this.specificationsRepository.create({ description, name });
    }
}

export { CreateSpecificationUseCase };
