import { UserService } from '../service/user.service';
import { LoginDTO, RegisterDTO, UserDTO, UserMapper } from '../DTOs/user.dto';
import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/users')
export class UsersController {
    // @Get('/')
    // @ResponseSchema(UserDTO, { isArray: true })
    // @OpenAPI({
    //     summary: 'Get all users',
    //     description: 'Lists all available users',
    //     responses: {
    //         '400': {
    //             description: 'Bad request',
    //         },
    //     },
    // })
    // async getAll(): Promise<UserDTO[]> {
    //     return (await UserService.getAllUsers()).map(user => UserMapper.toUserDTO(user));
    // }

    // @Get('/:id')
    // async getUserWithId(@Param('id') id: string): Promise<UserDTO> {
    //     return UserMapper.toUserDTO(await UserService.getUserWithId(id));
    // }

    @Post('/')
    @ResponseSchema(RegisterDTO)
    createUser(@Body() user: RegisterDTO): Promise<string> {
        return UserService.createUser(user);
    }

    @Post('/login')
    login(@Body() loginDTO: LoginDTO): Promise<string> {
        return UserService.login(loginDTO);
    }
}