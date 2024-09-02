import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsServiceController } from './transactions-service.controller';
import { TransactionsService } from './transactions-service.service';
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
    TypeOrmModule.forFeature([User, Transaction])
  ],
  controllers: [TransactionsServiceController],
  providers: [TransactionsService, UsersService],
})
export class TransactionsServiceModule {
  constructor(
    private readonly usersService: UsersService
  ) { }

  onApplicationBootstrap() {
    this.usersService.seedUsers();
  }
}
