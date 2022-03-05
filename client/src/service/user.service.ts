import { LoginDTO, RegisterDTO } from "../models/UserDTO";
import ApiService from '../service/api.service';
import { LOGIN, REGISTER, USERS } from "./constants";

const UserService = {
    createUser: function (registerDTO: RegisterDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            ApiService.postCall(USERS + REGISTER, registerDTO).then(function (token) {
                ApiService.setToken(token.data);

                resolve(token.data);
            }).catch(function (error) {
                reject(error.response.data.message);
            });
        })
    },
    login: function (loginDTO: LoginDTO): Promise<string> {
        return new Promise((resolve, reject) => {
            ApiService.postCall(USERS + LOGIN, loginDTO).then(function (token) {
                ApiService.setToken(token.data);
                resolve(token.data);
            }).catch(function (error) {
                reject(error.response.data.message);
            });
        });
    }
}

export default UserService;