import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { IUsersRepository } from '../../repositories/IUsersRepositories';

interface IRequest {
    user_id: string;
    avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
    constructor(@inject('UsersRepository') private readonly usersRepository: IUsersRepository) { }

    async execute({ avatarFile, user_id }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);
        if (user.avatar) {
            await deleteFile(`./tmp/avatar/${user.avatar}`);
        }
        user.avatar = avatarFile;
        await this.usersRepository.create(user);
    }
}

export { UpdateUserAvatarUseCase };
