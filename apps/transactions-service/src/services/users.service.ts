import { Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities";
import { usersData } from "../Data/users.data";

export class UsersService {
    private readonly logger = new Logger();

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) { }

    async seedUsers() {
        this.logger.log('Seeding users ...');

        const users = this.userRepo.create(usersData);
        const storedUsers = await this.userRepo.save(users);

        return storedUsers;
    }
}