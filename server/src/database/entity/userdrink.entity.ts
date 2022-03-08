import { IsPositive, Min } from "class-validator";
import { Entity, ManyToOne, Column, JoinColumn } from "typeorm";
import { Drink } from "./drink.entity";
import { User } from "./user.entity";

@Entity()
export class UserDrink {
    @ManyToOne(() => User, user => user.id, { primary: true, })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Drink, drink => drink.id, { primary: true, })
    @JoinColumn({ name: "drink_id" })
    drink: Drink;

    @Column()
    @Min(0)
    count: number;
}