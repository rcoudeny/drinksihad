import { IsArray, IsEmail, IsNotEmpty, Length, MinLength, Validate } from "class-validator";
import { JoinTable, ManyToMany } from "typeorm";
import { UsernameValidation } from "../../validation/username.validation";
import { Group } from "./group.entity";

const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity('d_user')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @UsernameValidation()
    username: string;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @ManyToMany(() => Group, group => group.users)
    @IsArray()
    @JoinTable()
    groups: Group[];
}