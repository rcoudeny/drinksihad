import { getConnection, getCustomRepository } from 'typeorm';
import { Group } from '../database/entity/group.entity';
import { User } from '../database/entity/user.entity';
import { UserGroup } from '../database/entity/usergroup.entity';
import { GroupRepository } from '../database/repository/group.repository';
import { UserRepository } from '../database/repository/user.repository';
import { UserGroupRepository } from '../database/repository/usergroup.repository';
import { CreateGroupDTO, GroupDTO } from '../DTOs/group.dto';
import log from '../logger';
import { UserService } from './user.service';
export abstract class GroupService {
    static async createGroup(userId: string, createGroupDTO: CreateGroupDTO): Promise<Group> {
        // const userRepository = getCustomRepository(UserRepository);
        const groupRepository = getCustomRepository(GroupRepository);
        const userGroupRepository = getCustomRepository(UserGroupRepository);

        let groupToAdd: Group = new Group();
        groupToAdd.name = createGroupDTO.name;
        groupToAdd = await groupRepository.save(groupToAdd);

        let user: User = await UserService.getUserWithId(userId);
        userGroupRepository.createUserGroup(user, groupToAdd);
        // user.addGroup(groupToAdd);
        // userRepository.save(user);
        return groupToAdd;
    }
    static async getGroupWithId(id: string): Promise<string> {
        return "get group with id " + id;
    }
    static async getGroupsFromUserWithId(userId: string): Promise<GroupDTO[]> {
        const userGroupRepository = getCustomRepository(UserGroupRepository);
        const userGroups: UserGroup[] = await userGroupRepository.findByUserId(userId);
        const groups: UserGroup[] = await userGroupRepository.find({
            where: {
                // relations: ['groups', 'users'],
                userId: userId,
            }
        });
        log.info(groups);
        // userGroups.forEach(userGroup => {
        //     userGroup.
        // })
        // const userRepository = getCustomRepository(UserRepository);
        // const user: User = await userRepository.findOne({
        //     relations: ['groups'],
        //     where: { 
        //         id: userId
        //     }
        // });

        return [groups[0].group];
        // return (await userRepository.findById(userId)).groups;
    }
    static async deleteGroupWithId(id: string): Promise<string> {
        return "delete group with id " + id;
    }
}