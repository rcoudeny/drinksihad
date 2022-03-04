import { EntityRepository, Repository } from "typeorm";
import { Group } from "../entity/group.entity";
import { User } from "../entity/user.entity";
import { UserGroup } from "../entity/usergroup.entity";


@EntityRepository(UserGroup)
export class UserGroupRepository extends Repository<UserGroup> {
    findByUserId(userId: string): Promise<UserGroup[]> {
        return this.manager.createQueryBuilder(UserGroup, 'user_group').where('user_group.userId = :userId', { userId: userId }).getMany();
    }
    createUserGroup(user: User, group: Group) {
        const userGroup: UserGroup = new UserGroup();
        userGroup.group = group;
        userGroup.user = user;
        this.manager.save(userGroup);
    }
}