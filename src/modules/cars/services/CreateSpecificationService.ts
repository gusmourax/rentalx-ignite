import { ICreateSpecificationDTO, ISpecificationsRepository } from '../repositories/ISpecificationsRepository';

class CreateSpecificationService {
    constructor(private readonly specificationsRepository: ISpecificationsRepository) { }

    execute({ name, description }: ICreateSpecificationDTO): void {
        const specificationAlreadyExists = this.specificationsRepository.findByName(name);
        if (specificationAlreadyExists) throw new Error('Specification already exists.');

        this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationService };
