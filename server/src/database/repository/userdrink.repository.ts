import { EntityRepository, Repository } from "typeorm";
import { Drink } from "../entity/drink.entity";
import { Group } from "../entity/group.entity";
import { User } from "../entity/user.entity";
import { UserDrink } from "../entity/userdrink.entity";

@EntityRepository(UserDrink)
export class UserDrinkRepository extends Repository<UserDrink> {
    createUserDrink(user: User, group: Group, drink: Drink) {
        const userDrink = new UserDrink();
        userDrink.user = user;
        userDrink.group = group;
        userDrink.drink = drink;
        this.manager.save(userDrink);
    }
}