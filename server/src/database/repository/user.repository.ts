import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findByEmail(email: string) {
        return this.manager.createQueryBuilder(User, "user")
            .where("user.email = :email", { email: email.toLowerCase() })
            .getOne();
    }
    findById(userId: string) {
        return this.manager.createQueryBuilder(User, "user")
            .where("user.id = :userId", { userId })
            .getOne();
    }
}