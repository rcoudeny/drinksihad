import { HttpError } from "routing-controllers";
import { getCustomRepository, getRepository, MoreThan } from "typeorm";
import { Drink } from "../database/entity/drink.entity";
import { Group } from "../database/entity/group.entity";
import { User } from "../database/entity/user.entity";
import { UserDrink } from "../database/entity/userdrink.entity";
import { UserDrinkRepository } from "../database/repository/userdrink.repository";
import { CreateDrinkDTO, DrinkDTO } from "../DTOs/drink.dto";
import { GroupService } from "./group.service";

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

    static async addDrinkToGroupWithId(groupId: string, drinkDTO: CreateDrinkDTO) {
        const drinkRepository = getRepository(Drink);
        let group: Group = await GroupService.getGroup(groupId);
        let drinkToCreate: Drink = new Drink();
        drinkToCreate.group = group;
        drinkToCreate.name = drinkDTO.name;
        drinkToCreate.price = drinkDTO.price;
        return await drinkRepository.manager.save(drinkToCreate);
    }

    static async getDrinksFromGroupWithId(groupId: string): Promise<Drink[]> {
        return getRepository(Drink).find({
            where: {
                group: {
                    id: groupId
                }
            }
        })
    }

    static async updateDrink(drinkId: string, drinkDTO: DrinkDTO): Promise<DrinkDTO> {
        const drinkRepository = getRepository(Drink);
        let drinkToUpdate: Drink = await drinkRepository.findOne(drinkId);
        drinkToUpdate.name = drinkDTO.name;
        drinkToUpdate.price = drinkDTO.price;
        return drinkRepository.save(drinkToUpdate);
    }

    static async deleteDrink(drinkId: string): Promise<boolean> {
        let userDrinks: UserDrink[] = await getRepository(UserDrink).find({
            relations: ['user'],
            where: {
                drink: {
                    id: drinkId
                },
                count: MoreThan(0)
            }
        })
        if (userDrinks.length === 0) {
            await getRepository(UserDrink).remove(await getRepository(UserDrink).find({
                relations: ['user', 'drink'],
                where: {
                    drink: {
                        id: drinkId
                    }
                }
            }));
            await getRepository(Drink).delete(drinkId);
            return true;
        } else {
            throw new HttpError(405, 'Cannot delete because these users still have a drink with this: ' + userDrinks.map(function (userDrink) {
                return userDrink.user.email;
            }).join(', '));
        }
    }
}