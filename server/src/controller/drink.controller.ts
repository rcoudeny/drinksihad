import { Body, CurrentUser, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { UserDTO } from "../DTOs/user.dto";
import { DrinkService } from '../service/drink.service';
import { UserService } from '../service/user.service';
import { CreateDrinkDTO, DrinkDTO, DrinkMapper, UserDrinkDTO } from '../DTOs/drink.dto';

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

    @Get('/:groupId')
    getDrinksFromGroup(@Param('groupId') groupId: string): Promise<DrinkDTO[]> {
        return DrinkService.getDrinksFromGroupWithId(groupId);
    }

    @Post('/:groupId')
    addDrinkToGroupWithId(@Param('groupId') groupId: string, @Body() drinkDTO: CreateDrinkDTO) {
        return DrinkService.addDrinkToGroupWithId(groupId, drinkDTO);
    }

    @Put('/:drinkId')
    updateDrink(@Param('drinkId') drinkId: string, @Body() drinkDTO: DrinkDTO): Promise<DrinkDTO> {
        return DrinkService.updateDrink(drinkId, drinkDTO);
    }

    @Delete("/:drinkId")
    deleteDrink(@Param('drinkId') drinkId: string): Promise<boolean> {
        return DrinkService.deleteDrink(drinkId);
    }
}