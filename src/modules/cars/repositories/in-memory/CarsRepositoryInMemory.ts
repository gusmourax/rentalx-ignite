import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
    private cars: Car[] = [];

    async create(createCarDto: ICreateCarDTO): Promise<Car> {
        const car = new Car();
        Object.assign(car, createCarDto);
        this.cars.push(car);
        return car;
    }

    async findByLicensePlate(licensePlate: string): Promise<Car> {
        const car = this.cars.find((car) => car.license_plate === licensePlate);
        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const cars = this.cars
            .filter((car) => {
                if (car.available
                    && ((brand && car.brand === brand)
                        || (category_id && car.category_id === category_id)
                        || (name && car.name === name))) {
                    return car;
                }
                return null;
            });

        return cars;
    }
}

export { CarsRepositoryInMemory };
