import { IsEmail, IsNotEmpty, IsObject } from "class-validator";
import { User } from "../database/entity/user.entity";
import { UsernameValidation } from "../validation/username.validation";

export class UserDTO {
    id: string;
    @UsernameValidation()
    username: string;
    @IsEmail()
    email: string;
}

export class LoginDTO {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}

export class RegisterDTO {
    @UsernameValidation()
    username: string;
    @IsEmail()
    email: string;
    @IsNotEmpty()
    password: string;
}

export abstract class UsersMapper {
    static toUserDTO(user: User): UserDTO {
        let userDTO = new UserDTO();
        userDTO.username = user.username;
        userDTO.email = user.email;
        return userDTO;
    }

    static registerDTOToUser(registerDTO: RegisterDTO): User {
        let user: User = new User();
        user.email = registerDTO.email;
        user.username = registerDTO.username;
        return user;
    }
}