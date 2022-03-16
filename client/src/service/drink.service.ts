import { DrinkCountDTO, DrinkDTO } from "../models/DrinkDTO";
import ApiService from "./api.service";
import { API_DRINKS } from "./constants";

const url = (...urlElements: string[]): string => {
    return `${API_DRINKS}/${urlElements.join('/')}`;
}

const DrinkService = {
    getDrinkCount(drinkId: string, userMail: string): Promise<number> {
        return ApiService.getCall(url(drinkId, userMail));
    },
    incrementDrinkCount(drinkId: string, userMail: string): Promise<DrinkCountDTO> {
        return ApiService.putCall(url(drinkId, userMail, 'increment'));
    },
    decrementDrinkCount(drinkId: string, userMail: string): Promise<DrinkCountDTO> {
        return ApiService.putCall(url(drinkId, userMail, 'decrement'));
    },
    getDrinksFromGroupWithId: function (groupId: string): Promise<DrinkDTO[]> {
        return ApiService.getCall(url(groupId))
    },
    createDrinkInGroupWithId: function (groupId: string, drink: DrinkDTO): Promise<DrinkDTO> {
        return ApiService.postCall(url(groupId), drink);
    },
    updateDrink: function (drink: DrinkDTO): Promise<DrinkDTO> {
        return ApiService.putCall(url(drink.id), drink);
    },
    deleteDrink: function (drinkId: string): Promise<void> {
        return ApiService.deleteCall(url(drinkId));
    }
}

export default DrinkService;