import { IsEmail, IsNotEmpty, Length, MinLength } from "class-validator";
import { JoinTable, ManyToMany } from "typeorm";
import { Group } from "./group.entity";

const { Entity, PrimaryGeneratedColumn, Column } = require("typeorm");

@Entity('d_user')
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Length(2, 30, { message: "A username should contain between 2 and 30 characters" })
    @IsNotEmpty({ message: 'A username is required' })
    username: string;

    @Column({ unique: true })
    @IsEmail({}, { message: 'Incorrect email' })
    @IsNotEmpty({ message: 'The email is required' })
    email: string;

    @Column()
    @MinLength(6, { message: 'The password must be at least 6 but not longer than 30 characters' })
    @IsNotEmpty({ message: 'The password is required' })
    password: string;

    @ManyToMany(() => Group, group => group.users)
    @JoinTable()
    groups: Group[];
}