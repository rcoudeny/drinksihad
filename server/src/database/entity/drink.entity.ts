import { MinLength } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PriceValidation } from "../../validation/price.validation";
import { Group } from "./group.entity";

@Entity()
export class Drink {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Group, group => group.drinks)
    group: Group;

    @Column()
    @MinLength(2)
    name: string;

    @Column({ type: "float" })
    @PriceValidation()
    price: number;
}