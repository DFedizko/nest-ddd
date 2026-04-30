export class BankAccount {
    public constructor(
        public readonly id: string,
        public balance: number,
        public accountNumber: string,
    ) {}

    public debit(amount: number) {
        this.balance -= amount
    }

    public credit(amount: number) {
        this.balance += amount
    }
}
