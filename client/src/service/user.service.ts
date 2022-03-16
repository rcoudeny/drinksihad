import { LoginDTO, RegisterDTO } from "../models/UserDTO";
import ApiService from '../service/api.service';
import { API_LOGIN, API_REGISTER, API_USERS } from "./constants";

const url = (...urlElements: string[]): string => {
    return `${API_USERS}/${urlElements.join('/')}`;
}

const UserService = {
    createUser: function (registerDTO: RegisterDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            ApiService.postCall(url(API_REGISTER), registerDTO).then(function (token) {
                ApiService.setToken(token);
                resolve(token.data);
            }).catch(function (error) {
                reject(error);
            });
        })
    },
    login: function (loginDTO: LoginDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            ApiService.postCall(url(API_LOGIN), loginDTO).then(function (token) {
                ApiService.setToken(token);
                resolve(token);
            }).catch(function (error) {
                reject(error);
            });
        });
    }
}

export default UserService;