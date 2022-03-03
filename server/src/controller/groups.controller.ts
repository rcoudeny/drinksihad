import { GroupDTO } from './../DTOs/group.dto';
import { Body, Delete, Get, JsonController, Param, Post } from "routing-controllers";
import { GroupsService } from "../service/groups.service";
import { ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/groups')
export class GroupsController {
    @Get('/')
    getAllGroups() {
        // TODORC: return all groups the logged in user is in
        return GroupsService.getMyGroups();
    }

    @Get('/:id')
    @ResponseSchema(GroupDTO)
    getGroupWithId(@Param('id') id: string) {
        return GroupsService.getGroupWithId(id);
    }

    @Post('/')
    @ResponseSchema(GroupDTO)
    createGroup(@Body() group: GroupDTO) {
        // TODORC: return the group with this id
        return GroupsService.createGroup(group);
    }

    @Delete('/:id')
    deleteGroupWithId(@Param('id') id: string) {
        // TODORC: Delete the group with id when user is owner of group
        return GroupsService.deleteGroupWithId(id);
    }
}