import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepositories';

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({
        driver_license, email, name, password, username,
    }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            driver_license, email, name, password, username,
        });
        await this.repository.save(user);
    }
}

export { UsersRepository };
