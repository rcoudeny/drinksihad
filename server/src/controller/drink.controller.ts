import { UserDrink } from './../database/entity/userdrink.entity';
import { CurrentUser, Get, JsonController, Param, Put } from "routing-controllers";
import { UserDTO } from "../DTOs/user.dto";
import { DrinkService } from '../service/drink.service';
import { User } from '../database/entity/user.entity';
import { getCustomRepository } from 'typeorm';
import { UserService } from '../service/user.service';

@JsonController('/drinks')
export class DrinkController {
    @Get('/:drinkId/:userMail')
    async getDrink(@CurrentUser({ required: true }) user: UserDTO, @Param('drinkId') drinkId: string, @Param('userMail') userMail: string): Promise<UserDrink> {
        return DrinkService.getDrink(drinkId, (await UserService.getUserWithEmail(userMail)).id);
    }

    @Put('/:drinkId/:userMail/decrement')
    async decrementDrinkCount(@CurrentUser({ required: true }) user: UserDTO, @Param('drinkId') drinkId: string, @Param('userMail') userMail: string) {
        DrinkService.decrementCount(drinkId, (await UserService.getUserWithEmail(userMail)));
    }

    @Put('/:drinkId/:userMail/increment')
    async incrementDrinkCount(@CurrentUser({ required: true }) user: UserDTO, @Param('drinkId') drinkId: string, @Param('userMail') userMail: string) {
        DrinkService.incrementCount(drinkId, (await UserService.getUserWithEmail(userMail)));
    }

}