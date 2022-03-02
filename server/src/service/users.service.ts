import { CreateUserDTO } from '../DTOs/user.dto';
import { getConnection } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { UserDTO, UsersMapper } from '../DTOs/user.dto';
import { UserRepository } from '../database/repository/user.repository';
import { validate } from 'class-validator';
import log from '../logger';

export abstract class UsersService {
    static async createUser(createUserDTO: CreateUserDTO): Promise<User> {
        let user: User = new User();
        UsersMapper.toUser(createUserDTO);
        const errors = await validate(user);
        log.error(errors);
        const userRepository = getConnection().getCustomRepository(UserRepository);
        await userRepository.save(user);
        return user;
    }

    static async getAllUsers(): Promise<UserDTO[]> {
        const userRepository = getConnection().getCustomRepository(UserRepository);
        const users: Array<UserDTO> = (await userRepository.find()).map(user => UsersMapper.toUserDTO(user));
        return users;
    }

    static async getUserWithId(id: string): Promise<UserDTO[]> {
        const userRepository = getConnection().getCustomRepository(UserRepository);
        userRepository.findByIds([id]);
        const users: Array<UserDTO> = (await userRepository.find()).map(user => UsersMapper.toUserDTO(user));
        return users;
    }
}