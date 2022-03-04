import { RegisterDTO } from '../DTOs/user.dto';
import { getConnection, getCustomRepository } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { UserDTO, UserMapper } from '../DTOs/user.dto';
import { UserRepository } from '../database/repository/user.repository';
import { validate } from 'class-validator';
import log from '../logger';
import { HttpError } from 'routing-controllers';
import { TokenService } from './token.service';

export abstract class UserService {
    static async createUser(registerDTO: RegisterDTO): Promise<string> {
        let user: User = UserMapper.registerDTOToUser(registerDTO);
        const errors = await validate(user);
        if (!errors.length) {
            const userRepository = getCustomRepository(UserRepository);
            await userRepository.save(user);
            return TokenService.generateAccessToken(UserMapper.toUserDTO(user));
        }
        throw new HttpError(400, "This was a bad request");
    }

    static async getAllUsers(): Promise<User[]> {
        return getCustomRepository(UserRepository).find();
    }

    static async getUserWithId(id: string): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        return await userRepository.findOne(id);
    }

    static async getUserWithEmail(email: string): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        return userRepository.findByEmail(email);
    }
}