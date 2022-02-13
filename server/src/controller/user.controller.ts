import { Body, Controller, Get, Param, Post } from "routing-controllers";
import { User } from "../database/entity/user.entity";
import { getAllUsers, getUserWithId } from "../manager/users.manager";

@Controller('/users')
export class UserController {
    @Get('/')
    getAll() {
        return getAllUsers();
    }
    @Get('/:id')
    getUserWithId(@Param('id') id: string) {
        return getUserWithId(id);
    }
    @Post('/')
    createUser(@Body() user: User) {
        return 'Create a user with name ' + user.firstName;
    }
}