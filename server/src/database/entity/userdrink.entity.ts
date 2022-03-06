import { Entity, ManyToOne, Column, JoinColumn } from "typeorm";
import { Drink } from "./drink.entity";
import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity()
export class UserDrink {
    @ManyToOne(() => Group, group => group.id, { primary: true, })
    @JoinColumn({ name: "group_id" })
    group: Group;

    @ManyToOne(() => User, user => user.id, { primary: true, })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Drink, drink => drink.id, { primary: true, })
    @JoinColumn({ name: "drink_id" })
    drink: Drink;

    @Column()
    count: number;
}