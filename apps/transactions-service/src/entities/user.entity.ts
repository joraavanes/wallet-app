import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Transaction } from "./transaction.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  balance: number;

  @OneToMany(() => Transaction, transaction => transaction.userId)
  transactions: Transaction[];
}