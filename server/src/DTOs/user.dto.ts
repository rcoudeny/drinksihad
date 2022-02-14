import { User } from "../database/entity/user.entity";


export class UserDTO {
    id: string;
    firstName: string;
    lastName: string;
    birthday: Date;
}

export class CreateUserDTO extends UserDTO {
    password: string;
}

export function toUserDTO(user: User): UserDTO {
    let userDTO = new UserDTO();
    userDTO.firstName = user.firstName
    userDTO.lastName = user.lastName;
    userDTO.birthday = user.birthday;
    return userDTO;
}