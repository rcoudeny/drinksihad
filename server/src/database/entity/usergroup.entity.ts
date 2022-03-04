import { Entity, ManyToOne } from "typeorm";
import { Group } from "./group.entity";
import { User } from "./user.entity";


@Entity()
export class UserGroup {
    @ManyToOne(() => User, user => user.id, { primary: true })
    user: User;

    @ManyToOne(() => Group, group => group.id, { primary: true, })
    group: Group;
}