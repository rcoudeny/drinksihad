import { getConnection } from 'typeorm';
import { User } from '../database/entity/user.entity';
import { UserDTO, toUserDTO } from '../DTOs/user.dto';

export async function createUser(user: User) {
    if (user.isValidNewUser()) {
        const userRepository = getConnection().getRepository(User);
        await userRepository.save(user);
        return user;
    } else {
        return {
            error: 'Firstname, lastName and password are required.'
        };
    }
}

export async function getAllUsers(): Promise<UserDTO[]> {
    const userRepository = getConnection().getRepository(User);
    const users: Array<UserDTO> = (await userRepository.find()).map(user => toUserDTO(user));
    return users;
}

export async function getUserWithId(id: string): Promise<UserDTO[]> {
    const userRepository = getConnection().getRepository(User);
    userRepository.findByIds([id]);
    const users: Array<UserDTO> = (await userRepository.find()).map(user => toUserDTO(user));
    return users;
}