import { Specification } from '../models/Specification';

export interface ICreateSpecificationDTO {
    name: string;
    description: string;
}

interface ISpecificationsRepository {
    create({ description, name }: ICreateSpecificationDTO): void;
    findByName(name: string): Specification | null;
}

export { ISpecificationsRepository };
