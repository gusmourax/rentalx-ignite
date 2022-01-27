import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { Rental } from '../../infra/typeorm/entities/Rental';
import { IRentalsRepository } from '../../repositories/IRentalsRepository';

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

class CreateRentalUseCase {
    constructor(
        private readonly rentalsRepository: IRentalsRepository,
        private readonly dateProvider: IDateProvider,
    ) { }

    async execute({ car_id, expected_return_date, user_id }: IRequest): Promise<Rental> {
        const minimumRentalHour = 24;

        const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(car_id);
        if (carUnavailable) throw new AppError('Car is unavailable');

        const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(user_id);
        if (rentalOpenToUser) throw new AppError('There is a rental in progress for user.');

        const compare = this.dateProvider.compareInHours(
            this.dateProvider.dateNow(),
            expected_return_date,
        );

        if (compare < minimumRentalHour) {
            throw new AppError('Expected return date must be at least 24 hours from now.');
        }

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };
