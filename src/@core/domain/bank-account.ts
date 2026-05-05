export class BankAccount {
    public constructor(
        private _balance: number,
        private _accountNumber: string,
        private readonly _id: string = crypto.randomUUID(),
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
