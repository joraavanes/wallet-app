import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TransactionsLogger } from './jobs/transaction-logs.job';
import { TransactionsService } from './transactions-service.service';
import { TransactionsServiceController } from './transactions-service.controller';
import { Transaction, User } from './entities';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: +process.env.POSTGRES_PORT,
      autoLoadEntities: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Transaction]),
    ScheduleModule.forRoot()
  ],
  controllers: [TransactionsServiceController],
  providers: [TransactionsService, UsersService, TransactionsLogger],
})
export class TransactionsServiceModule {
  constructor(
    private readonly usersService: UsersService
  ) { }

  onApplicationBootstrap() {
    this.usersService.seedUsers();
  }
}
