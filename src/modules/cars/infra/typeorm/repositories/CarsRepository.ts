import { getRepository, Repository } from 'typeorm';

import { ICreateCarDTO } from '../../../dtos/ICreateCarDTO';
import { ICarsRepository } from '../../../repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create(createCarDto: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create(createCarDto);
        await this.repository.save(car);
        return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        const car = await this.repository.findOne({ license_plate: licensePlate });
        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const carsQuery = this.repository
            .createQueryBuilder('c')
            .where('c.available = :available', { available: true });

        if (brand) carsQuery.andWhere('c.brand = :brand', { brand });
        if (name) carsQuery.andWhere('c.name = :name', { name });
        if (category_id) carsQuery.andWhere('c.category_id = :category_id', { category_id });

        return carsQuery.getMany();
    }

    async findById(id: string): Promise<Car> {
        const car = await this.repository.findOne(id);
        return car;
    }
}

export { CarsRepository };
