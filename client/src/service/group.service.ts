import { CreateGroup, GroupDTO } from "../models/GroupDTO";
import { UserWithAdminDTO } from "../models/UserDTO";
import ApiService from "./api.service";
import { CREATE_GROUP, GROUPS } from "./constants";

const GroupService = {
    createGroup: function (group: CreateGroup): Promise<GroupDTO> {
        return new Promise((resolve, reject) => {
            ApiService.postCall(CREATE_GROUP, group).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                reject(error.response.data.message);
            })
        })
    },
    getGroups: function (): Promise<GroupDTO[]> {
        return new Promise((resolve, reject) => {
            ApiService.getCall(GROUPS).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                reject(error.response.data.message);
            });
        })
    },
    getGroup: function (id: string): Promise<GroupDTO> {
        return new Promise((resolve, reject) => {
            ApiService.getCall(GROUPS + id).then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                reject(error.response.data.message);
            });
        });
    },
    getUsersFromGroup: function (id: string): Promise<UserWithAdminDTO[]> {
        return new Promise((resolve, reject) => {
            ApiService.getCall(GROUPS + id + "/users").then(function (response) {
                resolve(response.data);
            }).catch(function (error) {
                reject(error.response.data.message);
            });
        });

    }
}
export default GroupService;