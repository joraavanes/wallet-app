import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateTransaction } from '@app/transactions';
import { TRANSACTIONS_SERVICE } from './tokens';

@Controller()
export class AppController {
  constructor(
    @Inject(TRANSACTIONS_SERVICE) private readonly TransactionsService: ClientProxy
  ) { }

  @Get('/balance/:userId')
  async balance(@Param("userId") userId: string) {
    const balance = await lastValueFrom(
      this.TransactionsService.send('transactionsService-balance', +userId)
    );
    return balance;
  }

  @Post("/money")
  async money(@Body() body: CreateTransaction) {
    const transactions = await lastValueFrom(
      this.TransactionsService.send('transactionsService-transfer', body)
    );
    return transactions;
  }
}
