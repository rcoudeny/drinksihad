import { DrinkCountDTO } from "../models/DrinkDTO";
import ApiService from "./api.service";
import { DRINKS } from "./constants";

const DrinkService = {
    getDrinkCount(drinkId: string, userMail: string): Promise<DrinkCountDTO> {
        return ApiService.getCall(`${DRINKS}${drinkId}/${userMail}`);
    },
    incrementDrinkCount(drinkId: string, userMail: string): Promise<DrinkCountDTO> {
        return ApiService.putCall(`${DRINKS}${drinkId}/${userMail}/increment`);
    },
    decrementDrinkCount(drinkId: string, userMail: string): Promise<DrinkCountDTO> {
        return ApiService.putCall(`${DRINKS}${drinkId}/${userMail}/decrement`);
    }
}

export default DrinkService;