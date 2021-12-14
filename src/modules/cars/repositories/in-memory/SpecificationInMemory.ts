import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO';
import { Specification } from '../../infra/typeorm/entities/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
    private specifications: Specification[] = [];

    async create({ description, name }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification();
        Object.assign(specification, { description, name });
        this.specifications.push(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.specifications.find((specification) => (
            specification.name === name
        ));
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specifications.filter((specification) => (
            ids.includes(specification.id)
        ));
        return specifications;
    }
}

export { SpecificationRepositoryInMemory };
