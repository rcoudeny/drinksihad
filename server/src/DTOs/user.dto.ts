import { IsArray, IsEmail, IsNotEmpty, IsObject, IsUUID } from "class-validator";
import { Group } from "../database/entity/group.entity";
import { User } from "../database/entity/user.entity";
import { UsernameValidation } from "../validation/username.validation";
import { GroupDTO, GroupMapper } from "./group.dto";

export class UserDTO {
    @IsUUID()
    id: string;
    @UsernameValidation()
    username: string;
    @IsEmail()
    email: string;
    @IsArray()
    groups: GroupDTO[]

    setGroups(groups: Group[]) {
        this.groups = [];
        if (!groups) {
            return;
        }
        groups.map(function (group) {
            this.groups.push(GroupMapper.toGroupDTO(group));
        });
    }
}

export class UserWithAdminDTO {
    @UsernameValidation()
    username: string;
    @IsEmail()
    email: string;
    isAdmin: boolean;
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

export abstract class UserMapper {
    static toUserDTO(user: User): UserDTO {
        let userDTO = new UserDTO();
        userDTO.id = user.id;
        userDTO.username = user.username;
        userDTO.email = user.email;
        return userDTO;
    }

    static userDTOToUser(userDTO: UserDTO): User {
        let user = new User();
        user.id = userDTO.id;
        user.email = userDTO.email;
        user.username = userDTO.username;
        return user;
    }

    static registerDTOToUser(registerDTO: RegisterDTO): User {
        let user = new User();
        user.email = registerDTO.email.toLowerCase();
        user.username = registerDTO.username;
        return user;
    }
}