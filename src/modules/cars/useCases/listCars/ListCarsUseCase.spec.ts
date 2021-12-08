import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsUseCase } from './ListCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListCarsUseCase;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it('Should be able to list all available cars', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'Car_Brand',
            name: 'Car1',
            description: 'Car description.',
            license_plate: 'TTT-7894',
            fine_amount: 100,
            category_id: 'category_id',
            daily_rate: 180,
        });

        const cars = await listCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it('Should be able to list al available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'Car_Brand',
            name: 'Car1',
            description: 'Car description.',
            license_plate: 'TTT-7894',
            fine_amount: 100,
            category_id: 'category_id',
            daily_rate: 180,
        });

        const cars = await listCarsUseCase.execute({
            name: 'Car1',
        });

        expect(cars).toEqual([car]);
    });
});
