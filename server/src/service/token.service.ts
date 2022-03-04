import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { User } from '../database/entity/user.entity';
import { UserDTO } from '../DTOs/user.dto';
import log from '../logger';

interface UserJwtPayload extends JwtPayload {
    user?: UserDTO;
}

export abstract class TokenService {
    static async generateAccessToken(userDTO: UserDTO): Promise<string> {
        delete userDTO.groups;
        return sign({ user: userDTO } as UserJwtPayload, process.env.TOKEN_SECRET, { expiresIn: 1800 });
    }

    static async getCurrentUser(token: string): Promise<UserDTO> {
        if (token == null) return null;
        let userDTO: UserDTO;
        verify(token, process.env.TOKEN_SECRET as string, (err: any, jwtPayload: UserJwtPayload) => {
            if (err) {
                log.error(err);
                return null;
            }
            userDTO = jwtPayload.user as UserDTO;
        });
        return userDTO;
    }
}