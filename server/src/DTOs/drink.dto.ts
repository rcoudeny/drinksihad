import { MinLength } from "class-validator";
import { PriceValidation } from "../validation/price.validation";

export class DrinkDTO {
    @MinLength(2)
    name: string;
    @PriceValidation()
    price: number;
}

export class CreateDrinkDTO {
    @MinLength(2)
    name: string;
    @PriceValidation()
    price: number;
}