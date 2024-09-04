import { randomInt } from 'crypto';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Transaction } from '../entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly dataSource: DataSource
  ) { }

  findUser(userId: number) {
    return this.userRepo.findOneBy({ id: userId });
  }

  async balance(userId: number) {
    const user = await this.findUser(userId);
    if (!user) throw new Error('User not found');

    return { balance: user.balance };
  }

  async transfer(userId: number, amount: number) {
    const user = await this.findUser(userId);
    if (!user) throw new Error('User not found');

    if (amount < 0 && user.balance + amount < 0)
      throw new Error('No sufficient balance for transaction');

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {

      const transaction = new Transaction();
      transaction.amount = amount;
      transaction.referenceId = randomInt(+process.env.MAX_RANDOM_INT);
      transaction.userId = user;

      user.balance += amount;

      await queryRunner.manager.save(transaction);
      await queryRunner.manager.save(user);

      await queryRunner.commitTransaction();

      return { referenceId: transaction.referenceId };
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
