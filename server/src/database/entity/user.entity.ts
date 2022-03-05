import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { OneToMany } from "typeorm";
import { UsernameValidation } from "../../validation/username.validation";
import { UserGroup } from "./usergroup.entity";

const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity()
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
    hashedPassword: string;

    @Column()
    @IsNotEmpty()
    salt: string;

    @OneToMany(() => UserGroup, userGroup => userGroup.user)
    userGroups: UserGroup[]
}