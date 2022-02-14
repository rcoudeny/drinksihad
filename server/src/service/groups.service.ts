import { CreateGroupDTO } from './../DTOs/group.dto';
export abstract class GroupsService {
    static async createGroup(group: CreateGroupDTO): Promise<string> {
        return "create group with name " + group.name;
    }
    static async getGroupWithId(id: string): Promise<string> {
        return "get group with id " + id;
    }
    static async getMyGroups(): Promise<string> {
        return "get all groups of the current user";
    }
    static async deleteGroupWithId(id: string): Promise<string> {
        return "delete group with id " + id;
    }
}