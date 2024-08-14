import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TRANSACTIONS_SERVICE } from './tokens';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TRANSACTIONS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: process.env.NATS_URL
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
