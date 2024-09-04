import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './services/transactions-service.service';
import { CreateTransaction } from '@app/transactions';

@Controller()
export class TransactionsServiceController {
  constructor(private readonly transactionsService: TransactionsService) { }

  @MessagePattern("transactionsService-balance")
  async balance(@Payload() userId: number) {
    try {
      const payload = await this.transactionsService.balance(userId);
      return payload;
    } catch (error) {
      return { error: error.message }
    }
  }

  @MessagePattern("transactionsService-transfer")
  async money(@Payload() createTransaction: CreateTransaction) {
    try {
      const payload = await this.transactionsService.transfer(createTransaction.userId, createTransaction.amount);
      return payload;
    } catch (error) {
      return { error: error.message }
    }
  }
}
