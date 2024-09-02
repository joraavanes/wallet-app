import { User } from "../entities";

export const usersData: Array<Pick<User, "email" | "balance">> = [{
    email: 'mike@mail.co',
    balance: 2000
}, {
    email: 'frank@mail.co',
    balance: 1500
}, {
    email: 'merry@mail.co',
    balance: 2500
}, {
    email: 'fred@mail.co',
    balance: 3000
}, {
    email: 'mahdi@mail.co',
    balance: 1800
}];