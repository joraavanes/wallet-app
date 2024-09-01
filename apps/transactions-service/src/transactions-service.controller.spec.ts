import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsServiceController } from './transactions-service.controller';
import { TransactionsService } from './transactions-service.service';

describe('TransactionsServiceController', () => {
  let transactionsServiceController: TransactionsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsServiceController],
      providers: [TransactionsService],
    }).compile();

    transactionsServiceController = app.get<TransactionsServiceController>(TransactionsServiceController);
  });

});
