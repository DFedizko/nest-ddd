import { readableStreamLikeToAsyncGenerator } from 'rxjs/internal/util/isReadableStreamLike'
import { BankAccount } from './bank-account'
import type { BankAccountRepository } from './bank-account.repository'
import { TransferService } from './transfer.service'

type TransferProps = {
    accountNumberSource: string
    accountNumberDestiny: string
    amount: number
}

export class BankAccountService {
    public constructor(
        private readonly bankAccountRepo: BankAccountRepository,
    ) {}

    public async create(accountNumber: string): Promise<BankAccount> {
        const bankAccount = new BankAccount('1', 0, accountNumber)
        await this.bankAccountRepo.insert(bankAccount)
        return bankAccount
    }

    public async transfer({
        accountNumberSource,
        accountNumberDestiny,
        amount,
    }: TransferProps) {
        // TODO
    }
}
