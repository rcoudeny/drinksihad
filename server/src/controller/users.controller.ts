import { UsersService } from '../service/users.service';
import { CreateUserDTO } from '../DTOs/user.dto';
import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import log from "../logger";
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/users')
export class UsersController {
    @Get('/')
    @OpenAPI({
        summary: 'Get all users',
        description: 'Lists all available users',
        responses: {
            '400': {
                description: 'Bad request',
            },
        },
    })
    getAll() {
        return UsersService.getAllUsers();
    }

    @Get('/:id')
    getUserWithId(@Param('id') id: string) {
        return UsersService.getUserWithId(id);
    }

    @Post('/')
    @ResponseSchema(CreateUserDTO)
    createUser(@Body() user: CreateUserDTO) {
        UsersService.createUser(user);
        log.info('Created a user with name ' + user.firstName);
        return user;
    }
}