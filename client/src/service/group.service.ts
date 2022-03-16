import { CreateGroup, GroupDTO } from "../models/GroupDTO";
import { UserWithAdminDTO } from "../models/UserDTO";
import ApiService from "./api.service";
import { API_CREATE, API_GROUPS, API_USERS } from "./constants";

const url = (...urlElements: string[]): string => {
    return `${API_GROUPS}/${urlElements.join('/')}`;
}

const GroupService = {
    createGroup: function (group: CreateGroup): Promise<GroupDTO> {
        return ApiService.postCall(url(API_CREATE), group);
    },
    getGroups: function (): Promise<GroupDTO[]> {
        return ApiService.getCall(url());
    },
    getGroup: function (id: string): Promise<GroupDTO> {
        return ApiService.getCall(url(id));
    },
    getUsersFromGroup: function (id: string): Promise<UserWithAdminDTO[]> {
        return ApiService.getCall(url(id, API_USERS));
    }
}
export default GroupService;