import { CreateUserDTO } from '../DTOs/user.dto';
import { getConnection } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { UserDTO, UsersMapper } from '../DTOs/user.dto';

export abstract class UsersService {
    static async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        let user: User = new User();
        UsersMapper.toUser(createUserDTO);

        if (user.isValidNewUser()) {
            const userRepository = getConnection().getRepository(User);
            await userRepository.save(user);
            return user;
        } else {
            return null;
        }
    }

    static async getAllUsers(): Promise<UserDTO[]> {
        const userRepository = getConnection().getRepository(User);
        const users: Array<UserDTO> = (await userRepository.find()).map(user => UsersMapper.toUserDTO(user));
        return users;
    }

    static async getUserWithId(id: string): Promise<UserDTO[]> {
        const userRepository = getConnection().getRepository(User);
        userRepository.findByIds([id]);
        const users: Array<UserDTO> = (await userRepository.find()).map(user => UsersMapper.toUserDTO(user));
        return users;
    }
}