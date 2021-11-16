import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { User } from '../../infra/typeorm/entities/User';
import { IUsersRepository } from '../IUsersRepositories';

class UsersRepositoryInMemory implements IUsersRepository {
    private users: User[] = [];

    async create(data: ICreateUserDTO): Promise<void> {
        const user = new User();
        Object.assign(user, data);
        this.users.push(user);
    }
    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((u) => u.email === email);
        return user;
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find((u) => u.id === id);
        return user;
    }
}

export { UsersRepositoryInMemory };
