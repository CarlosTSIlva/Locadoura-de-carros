import { UserRepository } from '@modules/accounts/infra/typeorm/repositories/UserRepository';
import { inject, injectable } from 'tsyringe';
import { deleteFile } from 'utils/file';

interface IRequest {
  userId: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: UserRepository
  ) {}

  async execute({ avatar_file, userId }: IRequest): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatar_file;
    await this.userRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
