import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions-service.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './entities';

describe('TransactionsService', () => {
  const mockUsersData: User[] = [{
    id: 1,
    email: 'fred@mail.co',
    balance: 2000,
    transactions: []
  },
  {
    id: 2,
    email: 'mike@mail.co',
    balance: 3500,
    transactions: []
  }];

  let service: TransactionsService;
  const repositoryMockFactory = jest.fn(() => ({
    create: jest.fn(entity => entity),
    findOneBy: jest.fn(options => mockUsersData.find(user => user.id === options.id)),
    save: jest.fn(entity => entity),
  }));
  const datasourceMockFactory = jest.fn(() => ({
    createQueryRunner: jest.fn(() => ({
      connect: jest.fn(),
      startTransaction: jest.fn(),
      save: jest.fn(() => Promise.resolve()),
      commitTransaction: jest.fn(),
      rollbackTransaction: jest.fn(),
      release: jest.fn(),
      manager: {
        save: jest.fn()
      }
    })),
  }))

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory
        },
        {
          provide: DataSource,
          useFactory: datasourceMockFactory
        }
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should successfully add to the current balance', async () => {
    const result = await service.transfer(1, 100);

    expect(result).toBeDefined();
    expect(result.referenceId).toBeDefined();
    expect(typeof result.referenceId).toBe('number');
  });

  it('should fail if user does not exist', done => {
    service.transfer(3, 100)
      .catch(e => {
        expect(e.message).toBe('User not found');
        done();
      });
  });

  it('should fail on substract more than current balance', done => {
    service.transfer(1, -3000)
      .catch(e => {
        expect(e.message).toBe('No sufficient balance for transaction')
        done()
      });
  })
});