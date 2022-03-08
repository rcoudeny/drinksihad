import { DrinkDTO } from "../models/DrinkDTO";
import { CreateGroup, GroupDTO } from "../models/GroupDTO";
import { UserWithAdminDTO } from "../models/UserDTO";
import ApiService from "./api.service";
import { CREATE_GROUP, GROUPS } from "./constants";

const GroupService = {
    createGroup: function (group: CreateGroup): Promise<GroupDTO> {
        return ApiService.postCall(CREATE_GROUP, group);
    },
    getGroups: function (): Promise<GroupDTO[]> {
        return ApiService.getCall(GROUPS);
    },
    getGroup: function (id: string): Promise<GroupDTO> {
        return ApiService.getCall(GROUPS + id);
    },
    getUsersFromGroup: function (id: string): Promise<UserWithAdminDTO[]> {
        return ApiService.getCall(GROUPS + id + "/users");
    },
    getDrinksFromGroupWithId: function (groupId: string): Promise<DrinkDTO[]> {
        return ApiService.getCall(GROUPS + groupId + "/drinks")
    },
    createDrinkInGroupWithId: function (groupId: string, drink: DrinkDTO): Promise<DrinkDTO> {
        return ApiService.postCall(GROUPS + groupId + "/drinks", drink);
    },
    updateDrinkInGroupWithId: function (groupId: string, drink: DrinkDTO): Promise<DrinkDTO> {
        return ApiService.putCall(GROUPS + groupId + "/drinks/" + drink.id, drink);
    },
    deleteDrinkInGroupWithId: function (groupId: string, drinkId: string): Promise<void> {
        return ApiService.deleteCall(GROUPS + groupId + "/drinks/" + drinkId);
    }
}
export default GroupService;