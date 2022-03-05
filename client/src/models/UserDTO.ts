import { GroupDTO } from "./GroupDTO";

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    username: string;
    email: string;
    password: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    groups: GroupDTO[];
}

export interface UserWithAdminDTO {
    username: string;
    email: string;
    isAdmin: boolean;
}