import { LoginDTO, RegisterDTO } from '../DTOs/user.dto';
import { getCustomRepository } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { UserMapper } from '../DTOs/user.dto';
import { UserRepository } from '../database/repository/user.repository';
import { validate } from 'class-validator';
import { HttpError } from 'routing-controllers';
import { TokenService } from './token.service';
import { PasswordService } from './password.service';

export abstract class UserService {
    static async createUser(registerDTO: RegisterDTO): Promise<string> {
        const errors = await validate(registerDTO);
        if (!errors.length) {
            let user: User = UserMapper.registerDTOToUser(registerDTO);
            user.salt = PasswordService.generateSalt();
            user.hashedPassword = await PasswordService.hash(registerDTO.password, user.salt);
            const userRepository = getCustomRepository(UserRepository);
            await userRepository.save(user);
            return TokenService.generateAccessToken(UserMapper.toUserDTO(user));
        }
        throw new HttpError(400, "This was a bad request");
    }

    static async login(loginDTO: LoginDTO): Promise<string> {
        const user: User = await UserService.getUserWithEmail(loginDTO.email);
        if (PasswordService.isCorrectPassword(loginDTO.password, user.hashedPassword, user.salt)) {
            return TokenService.generateAccessToken(UserMapper.toUserDTO(user));
        }
        throw new HttpError(404, 'Wrong credentials');
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