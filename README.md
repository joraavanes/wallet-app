## Wallet App

Wallet App is an small sample to demonstrate a saving account and making transactions to it. This app is using Nest framework and nest-cli to generate a monorepo, PostgreSQL for data persistence, Docker for containerizing and NATS communication system as message broker.

Quick note about the design:
* This repo consists of 4 services configured with docker-compose multi-container tool, and the services configuration lives in a YAML file.
* The monorepo itself consists of 2 services, wallet-app and transactions-service, that use NATS message broker to communicate with each other.
* The wallet-app acts as an API gateway, which receives incoming traffic and then sends it to the regarding service.
* The transactions-service is solely meant to be the transactions domain, encompassing processes such as: handling transactions, users and transactions persistence, reports, logging, etc.
* Data persistence is made possible through PostgreSQL running on docker, and using Typeorm library

## Instructions
To get things up and running first you need to make sure to have docker installed on your machine, then enter:
```
docker-compose build
```
Images are now ready, next you can run them by entering command below:
```
docker-compose up
```
By now, the containers are running and ready to accept requests. After running the monorepo the users table is seeded with sample data.

## API endpoints
Following endpoints are listening on API gateway:
|               Url               |      Input     |         Input Sample             |         Output Sample          |
| ------------------------------- | -------------- | -------------------------------- | ------------------------------ |
| localhost:3000/balance/:userId  |  User Id param |                1                 |       {"balance": 2500}        |
| localhost:3000/money            |  JSON payload  |  {"userId": 1, "amount": -1200}  |    {"referenceId": 232132715}  |

## Unit tests
Unit tests are writtern for Transaction-service to test the behavior and functionality of the service layer. To run test cases, enter the command below:
```
npm run test:watch -- transactions-service
```
