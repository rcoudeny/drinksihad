import { IsNotEmpty, IsUUID } from "class-validator";
import { Group } from "../database/entity/group.entity";

export class GroupDTO {
    @IsUUID()
    id: string;
    @IsNotEmpty({ message: 'A name is required to create a group' })
    name: string;
}

export abstract class GroupMapper {
    static toGroupDTO(group: Group): GroupDTO {
        let groupDTO = new GroupDTO();
        groupDTO.id = group.id;
        groupDTO.name = group.name;
        return groupDTO;
    }
}