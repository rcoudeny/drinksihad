import { CreateGroupDTO, GroupDTO } from '../DTOs/group.dto';
import { Authorized, Body, CurrentUser, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { GroupService } from "../service/group.service";
import { ResponseSchema } from 'routing-controllers-openapi';
import { UserDTO, UserWithAdminDTO } from '../DTOs/user.dto';
import { CreateDrinkDTO, DrinkDTO, DrinkMapper } from '../DTOs/drink.dto';

@JsonController('/groups')
export class GroupController {
    @Get('/')
    getAllGroups(@CurrentUser({ required: true }) user: UserDTO) {
        return GroupService.getGroupsFromUserWithId(user.id);
    }

    @Get('/:id')
    @ResponseSchema(GroupDTO)
    getGroupWithId(@Param('id') id: string): Promise<GroupDTO> {
        return GroupService.getGroupWithId(id);
    }

    @Post('/create')
    @ResponseSchema(GroupDTO)
    createGroup(@CurrentUser({ required: true }) user: UserDTO, @Body() createGroupDTO: CreateGroupDTO) {
        return GroupService.createGroup(user.id, createGroupDTO);
    }

    @Post('/:id/addUser/:email')
    addUserWithEmailToGroupWithId(@Param('id') id: string, @Param('email') email: string) {
        return GroupService.addUserWithEmailToGroupWithId(id, email);
    }

    @Delete('/:id')
    deleteGroupWithId(@Param('id') id: string) {
        // TODORC: Delete the group with id when user is owner of group
        return GroupService.deleteGroupWithId(id);
    }

    @Get('/:id/users')
    getUsersFromGroupWithId(@Param('id') id: string): Promise<UserWithAdminDTO[]> {
        return GroupService.getUsersFromGroupWithId(id);
    }

    @Get('/:id/drinks')
    getDrinksFromGroupWithId(@Param('id') id: string): Promise<DrinkDTO[]> {
        return GroupService.getDrinksFromGroupWithId(id);
    }

    @Post('/:id/drinks')
    addDrinkToGroupWithId(@Param('id') id: string, @Body() drinkDTO: CreateDrinkDTO) {
        return GroupService.addDrinkToGroupWithId(id, drinkDTO);
    }

    @Put('/:id/drinks/:drinkId')
    updateDrinkFromGroupWithId(@Param('id') id: string, @Param('drinkId') drinkId: string, @Body() drinkDTO: DrinkDTO): Promise<DrinkDTO> {
        return GroupService.updateDrinkFromGroupWithId(id, drinkId, drinkDTO);
    }

    @Delete("/:id/drinks/:drinkId")
    deleteDrinkFromGroupWithId(@Param('id') id: string, @Param('drinkId') drinkId: string): Promise<boolean> {
        return GroupService.deleteDrinkFromGroupWithId(drinkId);
    }
}