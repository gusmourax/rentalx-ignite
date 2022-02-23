import { AppError } from '../../../../shared/errors/AppError';
import { ICreateCarDTO } from '../../dtos/ICreateCarDTO';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe('Create car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
    });

    it('Should be able to create a new car', async () => {
        const car = await createCarUseCase.execute({
            brand: 'Brand car',
            category_id: 'Category Id',
            daily_rate: 1234,
            description: 'Car description',
            fine_amount: 1234,
            license_plate: 'CAD1234',
            name: 'Carro',
        });

        expect(car).toHaveProperty('id');
    });

    it('Should not to be able create a car with exists license plate', () => {
        expect(async () => {
            const car: ICreateCarDTO = {
                brand: 'Brand car',
                category_id: 'Category Id',
                daily_rate: 1234,
                description: 'Car description',
                fine_amount: 1234,
                license_plate: 'CDD1234',
                name: 'Carro',
            };

            await createCarUseCase.execute(car);
            await createCarUseCase.execute({ ...car, name: 'Carro 2' });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to create a car with available true by default', async () => {
        const car = await createCarUseCase.execute({
            brand: 'Brand car',
            category_id: 'Category Id',
            daily_rate: 1234,
            description: 'Car description',
            fine_amount: 1234,
            license_plate: 'ABC1234',
            name: 'Carro',
        });

        expect(car.available).toBe(true);
    });
});
