import { UserService } from '../service/user.service';
import { LoginDTO, RegisterDTO, UserDTO, UserMapper } from '../DTOs/user.dto';
import { Body, Get, JsonController, Param, Post } from "routing-controllers";
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

@JsonController('/users')
export class UserController {
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
    async getAll(): Promise<string> {
        return "Dit werkt wel?";
    }

    // @Get('/:id')
    // async getUserWithId(@Param('id') id: string): Promise<UserDTO> {
    //     return UserMapper.toUserDTO(await UserService.getUserWithId(id));
    // }

    @Post('/register')
    @ResponseSchema(RegisterDTO)
    createUser(@Body() user: RegisterDTO): Promise<string> {
        return UserService.createUser(user);
    }

    @Post('/login')
    login(@Body() loginDTO: LoginDTO): Promise<string> {
        return UserService.login(loginDTO);
    }
}