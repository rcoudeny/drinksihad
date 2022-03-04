import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findByEmail(email: string) {
        return this.manager.createQueryBuilder(User, "d_user")
            .where("d_user.email = :email", { email })
            .getOne();
    }
    findById(userId: string) {
        return this.manager.createQueryBuilder(User, "d_user")
            .where("d_user.id = :userId", { userId })
            .getOne();
    }
}