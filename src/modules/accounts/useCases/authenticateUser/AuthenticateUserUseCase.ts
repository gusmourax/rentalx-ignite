import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { IAuthenticateUserDTO } from '../../dtos/IAuthenticateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepositories';

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(@inject('UsersRepository') private readonly usersRepository: IUsersRepository) { }

    async execute({ email, password }: IAuthenticateUserDTO): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) throw new AppError('Email or password incorrect', 401);

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) throw new AppError('Email or password incorrect', 401);

        const token = jwt.sign({}, 'a7e071b3de48cec1dd24de6cbe6c7bf1', {
            subject: user.id,
            expiresIn: '1d',
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                email: user.email,
                name: user.name,
            },
        };

        return tokenReturn;
    }
}

export { AuthenticateUserUseCase };
