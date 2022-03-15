import { getCustomRepository, getRepository } from "typeorm";
import { Drink } from "../database/entity/drink.entity";
import { User } from "../database/entity/user.entity";
import { UserDrink } from "../database/entity/userdrink.entity";
import { UserDrinkRepository } from "../database/repository/userdrink.repository";

export abstract class DrinkService {
    static async getUserDrink(drinkId: string, userId: string): Promise<UserDrink> {
        return getRepository(UserDrink).findOne({
            relations: ['user', 'drink'],
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

    static async getCount(drinkId: string, userId: string): Promise<number> {
        let count: number = 0;
        await getRepository(UserDrink).findOne({
            where: {
                user: {
                    id: userId
                },
                drink: {
                    id: drinkId
                }
            }
        }).then(function (userDrink: UserDrink) {
            if (userDrink) {
                count = userDrink.count;
            }
        });
        return count;
    }

    static async createUserDrink(drinkId: string, user: User, count: number): Promise<UserDrink> {
        let drink: Drink = (await getRepository(Drink).findOne({
            where: {
                id: drinkId
            }
        }));
        return getCustomRepository(UserDrinkRepository).createUserDrinkWithCount(user, drink, count);
    }

    static async decrementCount(drinkId: string, user: User): Promise<UserDrink> {
        let userDrink: UserDrink = await this.getUserDrink(drinkId, user.id);
        if (!userDrink) {
            DrinkService.createUserDrink(drinkId, user, 0);
        }
        userDrink.count--;
        if (userDrink.count < 0) {
            userDrink.count = 0;
        }
        getCustomRepository(UserDrinkRepository).save(userDrink);
        return userDrink;
    }

    static async incrementCount(drinkId: string, user: User): Promise<UserDrink> {
        let userDrink: UserDrink = await this.getUserDrink(drinkId, user.id);
        if (!userDrink) {
            return DrinkService.createUserDrink(drinkId, user, 1);
        }
        userDrink.count++;
        return getCustomRepository(UserDrinkRepository).save(userDrink);
    }
}