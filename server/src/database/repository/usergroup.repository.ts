import { EntityRepository, Repository } from "typeorm";
import { GroupDTO } from "../../DTOs/group.dto";
import { Group } from "../entity/group.entity";
import { User } from "../entity/user.entity";
import { UserGroup } from "../entity/usergroup.entity";


@EntityRepository(UserGroup)
export class UserGroupRepository extends Repository<UserGroup> {
    findByUserId(userId: string): Promise<UserGroup[]> {
        return this.createQueryBuilder('user_group').where('user_group."user_id" = :userId', { userId: userId }).getMany();
    }
    // findByUserId(userId: string): Promise<GroupDTO[]> {
    //     return this.createQueryBuilder('group').where('user_group."user_id" = :userId', { userId: userId }).getMany();
    // }
    createUserGroup(user: User, group: Group) {
        const userGroup: UserGroup = new UserGroup();
        userGroup.group = group;
        userGroup.user = user;
        userGroup.isAdmin = true;
        this.manager.save(userGroup);
    }
}