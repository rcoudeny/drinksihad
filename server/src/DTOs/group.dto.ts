import { IsNotEmpty, IsUUID } from "class-validator";
import { Group } from "../database/entity/group.entity";

export class GroupDTO {
    @IsUUID()
    id: string;
    @IsNotEmpty()
    name: string;
}

export class GroupWithAdminDTO {
    @IsUUID()
    id: string;
    @IsNotEmpty()
    name: string;
    isAdmin: boolean;
}

export class CreateGroupDTO {
    @IsNotEmpty()
    name: string;
}

export abstract class GroupMapper {
    static groupDTOToGroup(groupDTO: GroupDTO): Group {
        let group = new Group();
        group.name = groupDTO.name;
        return group;
    }
    static toGroupDTO(group: Group): GroupDTO {
        let groupDTO = new GroupDTO();
        groupDTO.id = group.id;
        groupDTO.name = group.name;
        return groupDTO;
    }
}