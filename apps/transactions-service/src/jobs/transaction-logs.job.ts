import { MoreThan, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { User } from "../entities";

@Injectable()
export class TransactionsLogger {
    private readonly logger = new Logger();

    constructor(
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) { }

    @Cron("0 59 23 * * *")
    async logDailyTransactions() {
        this.logger.verbose('Collect Daily Transactions');

        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        const users = await this.userRepo.find({
            relations: { transactions: true },
            where: {
                transactions: {
                    date: MoreThan(currentDate)
                }
            }
        });

        users.forEach(user => {
            let credits = 0
                , debits = 0;

            user.transactions.forEach(transaction => {
                transaction.amount > 0 ? credits += transaction.amount : debits += transaction.amount;
            });

            this.logger.verbose(
                `Account holder ${user.email} has had total credits of +${credits} and debits of ${debits} on ${currentDate.toDateString()}`);
        });
    }
}