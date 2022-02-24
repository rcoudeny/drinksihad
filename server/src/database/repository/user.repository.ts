import { EntityRepository, Repository } from "typeorm";
import { User } from "../entity/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findByEmail(email: string) {
        return this.createQueryBuilder("user")
            .where("user.email = :email", { email })
            .getOne();
    }
}