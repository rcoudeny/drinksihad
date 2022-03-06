import { MinLength } from "class-validator";
import { Drink } from "../database/entity/drink.entity";
import { PriceValidation } from "../validation/price.validation";

export class DrinkDTO {
    @MinLength(2)
    name: string;
    @PriceValidation()
    price: number;
    id: string;
}

export class CreateDrinkDTO {
    @MinLength(2)
    name: string;
    @PriceValidation()
    price: number;
}

export abstract class DrinkMapper {
    static toDrink(drinkDTO: DrinkDTO): Drink {
        let drink: Drink = new Drink();
        drink.id = drinkDTO.id;
        drink.name = drinkDTO.name;
        drink.price = drinkDTO.price;
        return drink;
    }
}