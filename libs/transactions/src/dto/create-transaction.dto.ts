import { IsNumber } from "class-validator";

export class CreateTransaction {
    @IsNumber()
    userId: number;

    @IsNumber()
    amount: number;
}