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
    email: string;

    @Column({ type: 'date', nullable: true })
    birthday: Date;

    @Column()
    password: string;

    isValidNewUser(): boolean {
        return true;
    }
}