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
        const bankAccount = new BankAccount(0, accountNumber)
        await this.bankAccountRepo.insert(bankAccount)
        return bankAccount
    }

    public async transfer({
        accountNumberSource,
        accountNumberDestiny,
        amount,
    }: TransferProps) {
        const bankAccountSource =
            await this.bankAccountRepo.findByAccountNumber(accountNumberSource)
        const bankAccountDestiny =
            await this.bankAccountRepo.findByAccountNumber(accountNumberDestiny)

        const transferService = new TransferService()
        transferService.transfer({
            bankAccountSource,
            bankAccountDestiny,
            amount,
        })

        await this.bankAccountRepo.update(bankAccountSource)
        await this.bankAccountRepo.update(bankAccountDestiny)
    }
}
