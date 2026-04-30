export class BankAccount {
    public constructor(
        private readonly _id: string,
        private _balance: number,
        private _accountNumber: string,
    ) {}

    public debit(amount: number) {
        this._balance -= amount
    }

    public credit(amount: number) {
        this._balance += amount
    }

    public get id(): string {
        return this._id
    }

    public get balance(): number {
        return this._balance
    }

    public get accountNumber(): string {
        return this._accountNumber
    }
}
