import { User } from "../database/entity/user.entity";


export class UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    birthday: Date;
}

export class CreateUserDTO extends UserDTO {
    email: string;
    password: string;
}

export abstract class UsersMapper {
    static toUserDTO(user: User): UserDTO {
        let userDTO = new UserDTO();
        userDTO.firstName = user.firstName
        userDTO.lastName = user.lastName;
        userDTO.birthday = user.birthday;
        return userDTO;
    }

    static toUser(createUserDTO: CreateUserDTO): User {
        let user: User = new User();
        user.firstName = createUserDTO.firstName;
        user.lastName = createUserDTO.lastName;
        user.email = createUserDTO.email;
        user.birthday = createUserDTO.birthday;
        return user;
    }
}