import { CreateUserDTO } from './../DTOs/user.dto';
import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import log from "../logger";
import { getAllUsers, getUserWithId } from "../manager/users.manager";

@JsonController('/users')
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
    createUser(@Body() user: CreateUserDTO) {
        log.info('Created a user with name ' + user.firstName);
        return user;
    }
}