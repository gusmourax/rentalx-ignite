import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe('List Available Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
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

    it('Should be able to list al available cars by brand', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'Car_Brand',
            name: 'Car2',
            description: 'Car description.',
            license_plate: 'TTT-7894',
            fine_amount: 100,
            category_id: 'category_id',
            daily_rate: 180,
        });

        const cars = await listCarsUseCase.execute({
            brand: 'Car_Brand',
        });

        expect(cars).toEqual([car]);
    });

    it('Should be able to list al available cars by name', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'Car_Brand',
            name: 'Car3',
            description: 'Car description.',
            license_plate: 'TTT-8667',
            fine_amount: 100,
            category_id: 'category_id',
            daily_rate: 180,
        });

        const cars = await listCarsUseCase.execute({
            name: 'Car3',
        });

        expect(cars).toEqual([car]);
    });

    it('Should be able to list al available cars by category', async () => {
        const car = await carsRepositoryInMemory.create({
            brand: 'Car_Brand',
            name: 'Car4',
            description: 'Car description.',
            license_plate: 'TTT-8667',
            fine_amount: 100,
            category_id: '123456789',
            daily_rate: 180,
        });

        const cars = await listCarsUseCase.execute({
            category_id: '123456789',
        });

        expect(cars).toEqual([car]);
    });
});
