import { CreateGroupDTO, GroupDTO } from '../DTOs/group.dto';
import { Body, CurrentUser, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { GroupService } from "../service/group.service";
import { ResponseSchema } from 'routing-controllers-openapi';
import { UserDTO } from '../DTOs/user.dto';

@JsonController('/groups')
export class GroupController {
    @Get('/')
    getAllGroups(@CurrentUser({ required: true }) user: UserDTO) {
        // TODORC: return all groups the logged in user is in
        return GroupService.getGroupsFromUserWithId(user.id);
    }

    @Get('/:id')
    @ResponseSchema(GroupDTO)
    getGroupWithId(@Param('id') id: string) {
        return GroupService.getGroupWithId(id);
    }

    @Post('/')
    @ResponseSchema(GroupDTO)
    createGroup(@CurrentUser({ required: true }) user: UserDTO, @Body() createGroupDTO: CreateGroupDTO) {
        return GroupService.createGroup(user.id, createGroupDTO);
    }

    @Delete('/:id')
    deleteGroupWithId(@Param('id') id: string) {
        // TODORC: Delete the group with id when user is owner of group
        return GroupService.deleteGroupWithId(id);
    }
}