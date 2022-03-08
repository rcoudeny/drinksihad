import { getRepository } from "typeorm";
import { UserDrink } from "../database/entity/userdrink.entity";

export abstract class DrinkService {
    static async getDrink(drinkId: string, userId: string): Promise<UserDrink> {
        return getRepository(UserDrink).findOne({
            where: {
                user: {
                    id: userId
                },
                drink: {
                    id: drinkId
                }
            }
        });
    }
}