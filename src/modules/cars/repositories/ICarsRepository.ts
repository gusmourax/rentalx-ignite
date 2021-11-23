import { ICreateCarDTO } from '../dtos/ICreateCarDTO';
import { Car } from '../infra/typeorm/entities/Car';

interface ICarsRepository {
    create(createCarDto: ICreateCarDTO): Promise<Car>;
    findByLicensePlate(licensePlate: string): Promise<Car>;
}

export { ICarsRepository };
