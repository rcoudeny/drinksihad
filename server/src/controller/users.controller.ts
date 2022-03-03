import { UsersService } from '../service/users.service';
import { RegisterDTO, UserDTO } from '../DTOs/user.dto';
import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import log from "../logger";
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/users')
export class UsersController {
    @Get('/')

    @ResponseSchema(UserDTO, { isArray: true })
    @OpenAPI({
        summary: 'Get all users',
        description: 'Lists all available users',
        responses: {
            '400': {
                description: 'Bad request',
            },
        },
    })
    getAll(): Promise<UserDTO[]> {
        return UsersService.getAllUsers();
    }

    @Get('/:id')
    getUserWithId(@Param('id') id: string): Promise<UserDTO> {
        return UsersService.getUserWithId(id);
    }

    @Post('/')
    @ResponseSchema(RegisterDTO)
    createUser(@Body() user: RegisterDTO) {
        return UsersService.createUser(user);
    }
}