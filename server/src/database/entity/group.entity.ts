import { IsNotEmpty } from "class-validator";
import { ManyToMany, OneToMany } from "typeorm";
import { Drink } from "./drink.entity";
import { User } from "./user.entity";
import { UserDrink } from "./userdrink.entity";
import { UserGroup } from "./usergroup.entity";

const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity()
export class Group {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @IsNotEmpty()
    name: string;

    @OneToMany(() => Drink, drink => drink.group)
    drinks: Drink[];

    @OneToMany(() => UserDrink, userdrink => userdrink.group)
    userDrinks: UserDrink[];

    @OneToMany(() => UserGroup, userGroup => userGroup.group)
    userGroups: UserGroup[];
}
