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

    @ManyToMany(() => Group, group => group.users, { cascade: true })
    @IsArray()
    @JoinTable()
    groups: Group[];

    addGroup(groupToAdd: Group) {
        if (!this.groups) {
            this.groups = [];
        }
        this.groups.push(groupToAdd);
    }

    removeGroupWithId(groupId: string) {
        if (this.groups) {
            var index: number = this.groups.findIndex(group => group.id === groupId);
            if (index !== -1) {
                this.groups.splice(index, 1);
            }
        }
    }
}