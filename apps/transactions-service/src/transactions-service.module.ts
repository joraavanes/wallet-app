import { Module } from '@nestjs/common';
import { TransactionsServiceController } from './transactions-service.controller';
import { TransactionsServiceService } from './transactions-service.service';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [TransactionsServiceController],
  providers: [TransactionsServiceService],
})
export class TransactionsServiceModule { }
