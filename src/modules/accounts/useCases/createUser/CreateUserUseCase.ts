import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepositories';

@injectable()
class CreateUserUseCase {
    constructor(@inject('UsersRepository') private readonly usersRepository: IUsersRepository) { }

    async execute({
        driver_license, email, name, password,
    }: ICreateUserDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        if (userAlreadyExists) throw new AppError('User already exists.', 400);

        const passwordHash = await bcrypt.hash(password, 10);

        await this.usersRepository.create({
            driver_license, email, name, password: passwordHash,
        });
    }
}

export { CreateUserUseCase };
