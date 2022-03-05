import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Group } from "./group.entity";
import { User } from "./user.entity";


@Entity()
export class UserGroup {
    @ManyToOne(() => User, user => user.userGroups, { primary: true })
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => Group, group => group.userGroups, { primary: true, })
    @JoinColumn({ name: "group_id" })
    group: Group;

    @Column({ name: "is_admin" })
    isAdmin: boolean;
}