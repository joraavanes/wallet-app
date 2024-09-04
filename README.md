<!-- ABOUT THE PROJECT -->
## Wallet App

Wallet App is an small sample to demonstrate a saving account and applying transactions on it. This app is using Nest framework and nest-cli to generate a monorepo, PostgreSQL for data persistence, Docker for containerizing and NATS communication system as message broker.


Quick note about the design:
* This repo consists of 4 services configured with docker-compose multi-container tool, and the services configuration lives in a YAML file.
* The monorepo itself consists of 2 services, wallet-app and transactions-service, that use NATS message broker to communicate with each other.
* The wallet-app acts as an API gateway, which receives incoming traffic and then sends it to the regarding service.
* The transactions-service is solely meant to for transaction domain, encompassing logic such as: handling transactions, users and transactions persistence, reports, logging, etc.
* Data persistence is made possible through PostgreSQL running on docker, and Typeorm library

