import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationRepositoryInMemory } from '../../repositories/in-memory/SpecificationInMemory';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationRepositoryInMemory;

describe('Create car specification', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory,
        );
    });

    it('Should not be able to add a new specification to a non-existent car', async () => {
        expect(async () => {
            const car_id = '1234';
            const specifications_id = ['9876, 5432', '1472', '2583'];
            await createCarSpecificationUseCase.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('Should be able to add a new specification to the car', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'Brand car',
            category_id: 'Category Id',
            daily_rate: 1234,
            description: 'Car description',
            fine_amount: 1234,
            license_plate: 'CAD1234',
            name: 'Carro',
        });
        const specification = await specificationsRepositoryInMemory.create({
            description: 'test',
            name: 'test',
        });

        const specifications_id = [specification.id];
        const specifications_cars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specifications_cars).toHaveProperty('specifications');
        expect(specifications_cars.specifications).toHaveLength(1);
    });
});
