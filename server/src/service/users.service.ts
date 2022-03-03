import { RegisterDTO } from '../DTOs/user.dto';
import { getConnection } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { UserDTO, UsersMapper } from '../DTOs/user.dto';
import { UserRepository } from '../database/repository/user.repository';
import { validate } from 'class-validator';
import log from '../logger';
import { HttpError } from 'routing-controllers';

export abstract class UsersService {
    static async createUser(registerDTO: RegisterDTO): Promise<User> {
        const errors = await validate(registerDTO);
        if (!errors.length) {
            let user: User = UsersMapper.registerDTOToUser(registerDTO);
            const userRepository = getConnection().getCustomRepository(UserRepository);
            await userRepository.save(user);
            return user;
        }
        throw new HttpError(400, "This was a bad request");
    }

    static async getAllUsers(): Promise<UserDTO[]> {
        const userRepository = getConnection().getCustomRepository(UserRepository);
        const users: UserDTO[] = (await userRepository.find()).map(user => UsersMapper.toUserDTO(user));
        return users;
    }

    static async getUserWithId(id: string): Promise<UserDTO> {
        const userRepository = getConnection().getCustomRepository(UserRepository);
        return UsersMapper.toUserDTO(await userRepository.findOne());
    }
}