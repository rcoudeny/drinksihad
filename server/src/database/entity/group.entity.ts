import { type } from "os";
import { ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Drink } from "./drink.entity";
import { User } from "./user.entity";
import { UserDrink } from "./userdrink.entity";

const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity('d_group')
export class Group {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @ManyToMany(() => User, user => user.groups)
    users: User[];

    @OneToMany(() => Drink, drink => drink.group)
    drinks: Drink[];

    @OneToMany(() => UserDrink, userdrink => userdrink.group)
    userDrinks: UserDrink[];
}
