import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";
import { randomInt } from "crypto";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({ default: new Date() })
  date: Date;

  @Column({ unique: true })
  referenceId: number;

  @ManyToOne(() => User, user => user.transactions)
  userId: User;
}