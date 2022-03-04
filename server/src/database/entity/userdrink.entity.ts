import { Entity, ManyToOne, Column } from "typeorm";
import { Drink } from "./drink.entity";
import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity()
export class UserDrink {
    @ManyToOne(() => Group, group => group.id, { primary: true, })
    group: Group;

    @ManyToOne(() => User, user => user.id, { primary: true, })
    user: User;

    @ManyToOne(() => Drink, drink => drink.id, { primary: true, })
    drink: Drink;

    @Column()
    count: number;
}