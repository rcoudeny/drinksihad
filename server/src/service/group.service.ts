import { UserDrink } from './../database/entity/userdrink.entity';
import { DeleteResult, getCustomRepository, getRepository, MoreThan } from 'typeorm';
import { Drink } from '../database/entity/drink.entity';
import { Group } from '../database/entity/group.entity';
import { User } from '../database/entity/user.entity';
import { UserGroup } from '../database/entity/usergroup.entity';
import { GroupRepository } from '../database/repository/group.repository';
import { UserGroupRepository } from '../database/repository/usergroup.repository';
import { CreateDrinkDTO, DrinkDTO } from '../DTOs/drink.dto';
import { CreateGroupDTO, GroupDTO, GroupWithAdminDTO } from '../DTOs/group.dto';
import { UserWithAdminDTO } from '../DTOs/user.dto';
import { UserService } from './user.service';
import { HttpError } from 'routing-controllers';
import log from '../logger';
export abstract class GroupService {
    static async createGroup(userId: string, createGroupDTO: CreateGroupDTO): Promise<Group> {
        const groupRepository = getCustomRepository(GroupRepository);
        const userGroupRepository = getCustomRepository(UserGroupRepository);

        let groupToAdd: Group = new Group();
        groupToAdd.name = createGroupDTO.name;
        groupToAdd = await groupRepository.save(groupToAdd);

        let user: User = await UserService.getUserWithId(userId);
        userGroupRepository.createUserGroup(user, groupToAdd);
        return groupToAdd;
    }
    static async getGroupWithId(id: string): Promise<Group> {
        const groupRepository = getCustomRepository(GroupRepository);
        return groupRepository.findOne(id);
    }
    static async getUsersFromGroupWithId(groupId: string): Promise<UserWithAdminDTO[]> {
        const userGroupRepository = getCustomRepository(UserGroupRepository);
        return (await userGroupRepository.find({
            relations: ['user'],
            where: {
                group: {
                    id: groupId
                }
            }
        })).map(function (userGroup) {
            return {
                username: userGroup.user.username,
                email: userGroup.user.email,
                isAdmin: userGroup.isAdmin
            }
        });
    }
    static async getGroupsFromUserWithId(userId: string): Promise<GroupDTO[]> {
        const userGroupRepository = getCustomRepository(UserGroupRepository);
        const groups: GroupWithAdminDTO[] = (await userGroupRepository.find({
            relations: ['group'],
            where: {
                user: {
                    id: userId
                }
            }
        })).map(function (userGroup) {
            return {
                id: userGroup.group.id,
                name: userGroup.group.name,
                isAdmin: userGroup.isAdmin
            }
        });

        return groups;
    }
    static async deleteGroupWithId(id: string): Promise<string> {
        return "delete group with id " + id;
    }
    static async addDrinkToGroupWithId(groupId: string, drinkDTO: CreateDrinkDTO) {
        const drinkRepository = getRepository(Drink);
        let group: Group = await GroupService.getGroupWithId(groupId);
        let drinkToCreate: Drink = new Drink();
        drinkToCreate.group = group;
        drinkToCreate.name = drinkDTO.name;
        drinkToCreate.price = drinkDTO.price;
        return await drinkRepository.manager.save(drinkToCreate);
    }
    static async getDrinksFromGroupWithId(groupId: string): Promise<Drink[]> {
        return getRepository(Drink).find({
            where: {
                group: {
                    id: groupId
                }
            }
        })
    }

    static async addUserWithEmailToGroupWithId(groupId: string, email: string) {
        const userGroupRepository = getCustomRepository(UserGroupRepository);
        UserService.getUserWithEmail(email).then(function (user: User) {
            GroupService.getGroupWithId(groupId).then(function (group: Group) {
                let userGroup: UserGroup = new UserGroup();
                userGroup.group = group;
                userGroup.user = user;
                userGroup.isAdmin = false;
                userGroupRepository.save(userGroup);
            })
        });
    }

    static async updateDrinkFromGroupWithId(groupId: string, drinkId: string, drinkDTO: DrinkDTO): Promise<DrinkDTO> {
        const drinkRepository = getRepository(Drink);
        let drinkToUpdate: Drink = await drinkRepository.findOne(drinkId);
        drinkToUpdate.name = drinkDTO.name;
        drinkToUpdate.price = drinkDTO.price;
        return drinkRepository.save(drinkToUpdate);
    }

    static async deleteDrinkFromGroupWithId(drinkId: string): Promise<boolean> {
        let userDrinks: UserDrink[] = await getRepository(UserDrink).find({
            relations: ['user'],
            where: {
                drink: {
                    id: drinkId
                },
                count: MoreThan(0)
            }
        })
        if (userDrinks.length === 0) {
            getRepository(Drink).delete(drinkId);
            return true;
        } else {
            throw new HttpError(405, 'Cannot delete because these users still have a drink with this: ' + userDrinks.map(function (userDrink) {
                return userDrink.user;
            }).join(', '));
        }
    }
}