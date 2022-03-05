import { EntityRepository, Repository } from "typeorm";
import { Group } from "../entity/group.entity";
import { UserGroup } from "../entity/usergroup.entity";


@EntityRepository(Group)
export class GroupRepository extends Repository<Group> {
    getGroupsWithUser(userId: string): Promise<Group[]> {
        return this.createQueryBuilder("group").select(['group.name', 'group.id', 'is_admin']).leftJoinAndSelect(Group, "group", 'user_group.user_id = :userId', { userId: userId }).getMany();
    }
}