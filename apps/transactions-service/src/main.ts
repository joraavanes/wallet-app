import { NestFactory } from '@nestjs/core';
import { TransactionsServiceModule } from './transactions-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(TransactionsServiceModule, {
    transport: Transport.NATS,
    options: {
      servers: process.env.NATS_URL,
    },
  });
  await app.listen();
}
bootstrap();
