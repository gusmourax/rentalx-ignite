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
}

export { CarsRepository };
