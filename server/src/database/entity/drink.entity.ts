import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";

@Entity()
export class Drink {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Group, group => group.drinks)
    group: Group;

    @Column()
    name: string;

    @Column()
    price: number;
}