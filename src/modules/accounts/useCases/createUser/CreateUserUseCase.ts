import bcrypt from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepositories';

@injectable()
class CreateUserUseCase {
    constructor(@inject('UsersRepository') private readonly usersRepository: IUsersRepository) { }

    async execute({
        driver_license, email, name, password,
    }: ICreateUserDTO): Promise<void> {
        const passwordHash = await bcrypt.hash(password, 10);

        await this.usersRepository.create({
            driver_license, email, name, password: passwordHash,
        });
    }
}

export { CreateUserUseCase };
