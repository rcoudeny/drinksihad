import { EntityRepository, Repository } from "typeorm";
import { Drink } from "../entity/drink.entity";
import { User } from "../entity/user.entity";
import { UserDrink } from "../entity/userdrink.entity";

@EntityRepository(UserDrink)
export class UserDrinkRepository extends Repository<UserDrink> {
    createUserDrink(user: User, drink: Drink) {
        const userDrink = new UserDrink();
        userDrink.user = user;
        userDrink.drink = drink;
        userDrink.count = 0;
        return this.manager.save(userDrink);
    }
    createUserDrinkWithCount(user: User, drink: Drink, count: number) {
        const userDrink = new UserDrink();
        userDrink.user = user;
        userDrink.drink = drink;
        userDrink.count = count;
        return this.manager.save(userDrink);
    }
}