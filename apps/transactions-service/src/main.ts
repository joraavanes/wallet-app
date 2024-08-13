import { NestFactory } from '@nestjs/core';
import { TransactionsServiceModule } from './transactions-service.module';

async function bootstrap() {
  const app = await NestFactory.create(TransactionsServiceModule);
  await app.listen(3000);
}
bootstrap();
