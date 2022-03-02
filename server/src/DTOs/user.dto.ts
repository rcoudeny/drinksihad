import { User } from "../database/entity/user.entity";


export class UserDTO {
    id: string;
    username: string;
}

export class CreateUserDTO extends UserDTO {
    email: string;
    password: string;
}

export abstract class UsersMapper {
    static toUserDTO(user: User): UserDTO {
        let userDTO = new UserDTO();
        userDTO.username = user.username;
        return userDTO;
    }

    static toUser(createUserDTO: CreateUserDTO): User {
        let user: User = new User();
        user.email = createUserDTO.email;
        user.username = createUserDTO.username;
        return user;
    }
}