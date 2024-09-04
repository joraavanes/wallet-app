import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TransactionsService } from './services/transactions-service.service';

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
  async money(@Payload() transferMoney: any) {
    try {
      const payload = await this.transactionsService.transfer(transferMoney.userId, transferMoney.amount);
      return payload;
    } catch (error) {
      return { error: error.message }
    }
  }
}
