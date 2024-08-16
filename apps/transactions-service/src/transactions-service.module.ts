import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsServiceController } from './transactions-service.controller';
import { TransactionsServiceService } from './transactions-service.service';
import { Transaction, User } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      port: +process.env.POSTGRES_PORT,
      entities: [User, Transaction],
      autoLoadEntities: true,
      synchronize: true
    }),
    TypeOrmModule.forFeature([User, Transaction])
  ],
  controllers: [TransactionsServiceController],
  providers: [TransactionsServiceService],
})
export class TransactionsServiceModule { }
