import { CurrentUser, Get, JsonController, Param, Put } from "routing-controllers";
import { UserDTO } from "../DTOs/user.dto";
import { DrinkService } from '../service/drink.service';
import { UserService } from '../service/user.service';
import { DrinkMapper, UserDrinkDTO } from '../DTOs/drink.dto';

@JsonController('/drinks')
export class DrinkController {
    @Get('/:drinkId/:userMail')
    async getDrink(@CurrentUser({ required: true }) user: UserDTO, @Param('drinkId') drinkId: string, @Param('userMail') userMail: string): Promise<number> {
        return DrinkService.getCount(drinkId, (await UserService.getUserWithEmail(userMail)).id);
    }

    @Put('/:drinkId/:userMail/decrement')
    async decrementDrinkCount(@CurrentUser({ required: true }) user: UserDTO, @Param('drinkId') drinkId: string, @Param('userMail') userMail: string): Promise<UserDrinkDTO> {
        return DrinkMapper.toUserDrinkDTO(await DrinkService.decrementCount(drinkId, (await UserService.getUserWithEmail(userMail))));
    }

    @Put('/:drinkId/:userMail/increment')
    async incrementDrinkCount(@CurrentUser({ required: true }) user: UserDTO, @Param('drinkId') drinkId: string, @Param('userMail') userMail: string): Promise<UserDrinkDTO> {
        return DrinkMapper.toUserDrinkDTO(await DrinkService.incrementCount(drinkId, (await UserService.getUserWithEmail(userMail))));
    }

}