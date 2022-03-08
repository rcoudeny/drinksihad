import { UserDrink } from './../database/entity/userdrink.entity';
import { CurrentUser, Get, JsonController, Param } from "routing-controllers";
import { UserDTO } from "../DTOs/user.dto";
import { DrinkService } from '../service/drink.service';

@JsonController('/drinks')
export class DrinkController {
    @Get('/:drinkId')
    getDrink(@CurrentUser({ required: true }) user: UserDTO, @Param('drinkId') drinkId: string): Promise<UserDrink> {
        return DrinkService.getDrink(drinkId, user.id);
    }
}