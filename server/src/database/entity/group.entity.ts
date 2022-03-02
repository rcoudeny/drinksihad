import { User } from "./user.entity";

const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity()
export class Group {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    admin: User;

    @Column()
    users: Array<User>

    @Column()
    drinks: Array<Drink>

    @Column()
    userDrinks: Array<UserDrink>;
}

@Entity()
export class Drink {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;
}

@Entity()
export class UserDrink {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    user: User;

    @Column()
    drink: Drink;

    @Column()
    count: number;
}