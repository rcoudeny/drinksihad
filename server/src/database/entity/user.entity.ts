const { Entity, PrimaryGeneratedColumn, Column, BaseEntity } = require("typeorm");

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    birthday: Date;

    @Column()
    password: string;

}